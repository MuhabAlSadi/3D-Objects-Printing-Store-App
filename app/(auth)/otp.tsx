import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function OTPScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { verifyOTP, verifyResetOTP, resendOTP } = useAuth();

  // Route params: email and type ('verification' | 'reset')
  const { email, type } = useLocalSearchParams<{ email: string; type: 'verification' | 'reset' }>();

  const isVerification = type === 'verification';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Countdown timer for resend (60 seconds)
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Refs for each OTP input box so we can auto-focus next box
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    startCountdown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCountdown = () => {
    setCountdown(60);
    setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (value: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    setError('');
    const newOtp = [...otp];

    if (value.length > 1) {
      // Handle paste — distribute digits across boxes
      const digits = value.slice(0, 6).split('');
      digits.forEach((digit, i) => {
        if (index + i < 6) newOtp[index + i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next box when a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // On backspace in an empty box, go back to previous box
    if (key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    if (isVerification) {
      const result = await verifyOTP(email, code);
      setIsSubmitting(false);
      if (result.success) {
        setSuccessMessage(result.message);
        setTimeout(() => router.replace('/(auth)/sign-in'), 1500);
      } else {
        setError(result.message);
        // Clear OTP boxes on wrong code
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } else {
      // Password reset flow
      const result = await verifyResetOTP(email, code);
      setIsSubmitting(false);
      if (result.success) {
        // Navigate to new password screen, passing the userId
        router.replace({
          pathname: '/(auth)/new-password',
          params: { userId: result.userId },
        });
      } else {
        setError(result.message);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setIsResending(true);
    setError('');
    const result = await resendOTP(email, type);
    setIsResending(false);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(''), 3000);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      startCountdown();
    } else {
      setError(result.message);
    }
  };

  const boxBase = `w-12 h-14 rounded-2xl border text-center text-xl font-black`;
  const boxActive = `border-primary bg-primary/5 dark:bg-primary/10`;
  const boxError = `border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-500/10`;
  const boxDefault = `border-slate-200 dark:border-slate-700/50 bg-white dark:bg-secondary`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-backgroundlight dark:bg-[#1E293B]"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: insets.top }}
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6"
        keyboardShouldPersistTaps="handled"
      >
        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white dark:bg-secondary items-center justify-center mt-4 border border-slate-100 dark:border-slate-700/50"
        >
          <Feather name="arrow-left" size={18} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>

        {/* HEADER */}
        <View className="mt-8 mb-10">
          <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center mb-5">
            <Feather name="mail" size={28} color="white" />
          </View>
          <Text className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isVerification ? 'Verify Email' : 'Reset Password'}
          </Text>
          <Text className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-1.5">
            Enter the 6-digit code sent to
          </Text>
          <Text className="text-sm font-bold text-primary mt-0.5">{email}</Text>
        </View>

        {/* SUCCESS MESSAGE */}
        {successMessage ? (
          <View className="flex-row items-center bg-green-50 dark:bg-green-500/10 rounded-xl px-4 py-3 mb-5">
            <Feather name="check-circle" size={16} color="#22C55E" />
            <Text className="text-xs font-semibold text-green-600 dark:text-green-400 ml-2 flex-1">
              {successMessage}
            </Text>
          </View>
        ) : null}

        {/* ERROR MESSAGE */}
        {error ? (
          <View className="flex-row items-center bg-red-50 dark:bg-red-500/10 rounded-xl px-4 py-3 mb-5">
            <Feather name="alert-circle" size={16} color="#EF4444" />
            <Text className="text-xs font-semibold text-red-500 ml-2 flex-1">{error}</Text>
          </View>
        ) : null}

        {/* OTP INPUT BOXES */}
        <View className="flex-row justify-between mb-8">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={6}
              selectTextOnFocus
              className={`${boxBase} ${
                error ? boxError : digit ? boxActive : boxDefault
              } text-slate-900 dark:text-white`}
              style={{ textAlign: 'center' }}
            />
          ))}
        </View>

        {/* VERIFY BUTTON */}
        <TouchableOpacity
          onPress={handleVerify}
          disabled={isSubmitting}
          className="bg-primary rounded-2xl py-4 items-center mb-6"
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-black text-sm">
              {isVerification ? 'Verify Email' : 'Verify Code'}
            </Text>
          )}
        </TouchableOpacity>

        {/* RESEND */}
        <View className="flex-row justify-center items-center">
          <Text className="text-sm font-medium text-slate-400 dark:text-slate-500">
            Didn&apos;t receive the code?
          </Text>
          <TouchableOpacity
            onPress={handleResend}
            disabled={!canResend || isResending}
            className="ml-1.5"
          >
            {isResending ? (
              <ActivityIndicator size="small" color="#FF7518" />
            ) : (
              <Text
                className={`text-sm font-black ${
                  canResend ? 'text-primary' : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                {canResend ? 'Resend' : `Resend in ${countdown}s`}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
