import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
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

export default function NewPasswordScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { resetPassword } = useAuth();

  const { userId } = useLocalSearchParams<{ userId: string }>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const placeholderColor = isDark ? '#64748B' : '#94A3B8';

  const handleReset = async () => {
    setPasswordError('');
    setConfirmError('');
    setFormError('');

    let hasError = false;
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Must be at least 6 characters');
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmError('Please confirm your password');
      hasError = true;
    } else if (password && confirmPassword && password !== confirmPassword) {
      setConfirmError('Passwords don\u2019t match');
      hasError = true;
    }
    if (hasError) return;

    setIsSubmitting(true);
    const result = await resetPassword(Number(userId), password);
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.replace('/(auth)/sign-in'), 2000);
    } else {
      setFormError(result.message);
    }
  };

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
      >
        {!success ? (
          <>
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
                <Feather name="lock" size={28} color="white" />
              </View>
              <Text className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                New Password
              </Text>
              <Text className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-1.5">
                Choose a strong password for your account
              </Text>
            </View>

            {/* FORM ERROR */}
            {formError ? (
              <View className="flex-row items-center bg-red-50 dark:bg-red-500/10 rounded-xl px-4 py-3 mb-5">
                <Feather name="alert-circle" size={16} color="#EF4444" />
                <Text className="text-xs font-semibold text-red-500 ml-2 flex-1">{formError}</Text>
              </View>
            ) : null}

            {/* PASSWORD INPUT */}
            <View className="mb-4">
              <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                New Password
              </Text>
              <View
                className={`flex-row items-center bg-white dark:bg-secondary rounded-2xl px-4 border ${
                  passwordError ? 'border-red-400 dark:border-red-500' : 'border-slate-100 dark:border-slate-700/50'
                }`}
              >
                <Feather name="lock" size={18} color={passwordError ? '#EF4444' : placeholderColor} />
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="At least 6 characters"
                  placeholderTextColor={placeholderColor}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 py-3.5 ml-3 text-sm font-semibold text-slate-900 dark:text-white"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color={placeholderColor} />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text className="text-xs font-semibold text-red-500 mt-1.5 ml-1">{passwordError}</Text>
              ) : null}
            </View>

            {/* CONFIRM PASSWORD INPUT */}
            <View className="mb-8">
              <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Confirm Password
              </Text>
              <View
                className={`flex-row items-center bg-white dark:bg-secondary rounded-2xl px-4 border ${
                  confirmError ? 'border-red-400 dark:border-red-500' : 'border-slate-100 dark:border-slate-700/50'
                }`}
              >
                <Feather name="lock" size={18} color={confirmError ? '#EF4444' : placeholderColor} />
                <TextInput
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmError) setConfirmError('');
                  }}
                  placeholder="Re-enter your password"
                  placeholderTextColor={placeholderColor}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 py-3.5 ml-3 text-sm font-semibold text-slate-900 dark:text-white"
                />
              </View>
              {confirmError ? (
                <Text className="text-xs font-semibold text-red-500 mt-1.5 ml-1">{confirmError}</Text>
              ) : null}
            </View>

            {/* SUBMIT BUTTON */}
            <TouchableOpacity
              onPress={handleReset}
              disabled={isSubmitting}
              className="bg-primary rounded-2xl py-4 items-center"
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-black text-sm">Reset Password</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <View className="mt-24 items-center">
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-6">
              <Feather name="check-circle" size={32} color="#FF7518" />
            </View>
            <Text className="text-2xl font-black text-slate-900 dark:text-white tracking-tight text-center">
              Password Reset!
            </Text>
            <Text className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-2.5 text-center px-4">
              Your password has been updated. Redirecting you to sign in...
            </Text>
            <ActivityIndicator color="#FF7518" className="mt-8" />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
