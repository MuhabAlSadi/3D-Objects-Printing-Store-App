import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
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
import Svg, { Path } from 'react-native-svg';
import { useAuth } from '../context/AuthContext';

function GoogleIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 48 48">
      <Path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <Path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <Path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <Path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </Svg>
  );
}

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [formError, setFormError] = useState('');

  const placeholderColor = isDark ? '#64748B' : '#94A3B8';

  const clearErrors = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmError('');
    setFormError('');
  };

  const handleSignUp = async () => {
    clearErrors();

    let hasError = false;
    if (!name) { setNameError('Name is required'); hasError = true; }
    if (!email) { setEmailError('Email is required'); hasError = true; }
    if (!password) {
      setPasswordError('Password is required'); hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Must be at least 6 characters'); hasError = true;
    }
    if (!confirmPassword) {
      setConfirmError('Please confirm your password'); hasError = true;
    } else if (password && confirmPassword && password !== confirmPassword) {
      setConfirmError("Passwords don't match"); hasError = true;
    }
    if (hasError) return;

    setIsSubmitting(true);
    const result = await signUp(name.trim(), email.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      router.push({
        pathname: '/(auth)/otp' as any,
        params: { email: email.trim(), type: 'verification' },
      });
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
        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white dark:bg-secondary items-center justify-center mt-4 border border-slate-100 dark:border-slate-700/50"
        >
          <Feather name="arrow-left" size={18} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>

        {/* HEADER */}
        <View className="mt-6 mb-8">
          <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center mb-5">
            <Feather name="user-plus" size={28} color="white" />
          </View>
          <Text className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Create Account
          </Text>
          <Text className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-1.5">
            Join PrintHub and start exploring 3D models
          </Text>
        </View>

        {/* FORM ERROR */}
        {formError ? (
          <View className="flex-row items-center bg-red-50 dark:bg-red-500/10 rounded-xl px-4 py-3 mb-5">
            <Feather name="alert-circle" size={16} color="#EF4444" />
            <Text className="text-xs font-semibold text-red-500 ml-2 flex-1">{formError}</Text>
          </View>
        ) : null}

        {/* NAME INPUT */}
        <View className="mb-4">
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Full Name</Text>
          <View className={`flex-row items-center bg-white dark:bg-secondary rounded-2xl px-4 border ${nameError ? 'border-red-400 dark:border-red-500' : 'border-slate-100 dark:border-slate-700/50'}`}>
            <Feather name="user" size={18} color={nameError ? '#EF4444' : placeholderColor} />
            <TextInput
              value={name}
              onChangeText={(text) => { setName(text); if (nameError) setNameError(''); }}
              placeholder="John Doe"
              placeholderTextColor={placeholderColor}
              autoCapitalize="words"
              className="flex-1 py-3.5 ml-3 text-sm font-semibold text-slate-900 dark:text-white"
            />
          </View>
          {nameError ? <Text className="text-xs font-semibold text-red-500 mt-1.5 ml-1">{nameError}</Text> : null}
        </View>

        {/* EMAIL INPUT */}
        <View className="mb-4">
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Email</Text>
          <View className={`flex-row items-center bg-white dark:bg-secondary rounded-2xl px-4 border ${emailError ? 'border-red-400 dark:border-red-500' : 'border-slate-100 dark:border-slate-700/50'}`}>
            <Feather name="mail" size={18} color={emailError ? '#EF4444' : placeholderColor} />
            <TextInput
              value={email}
              onChangeText={(text) => { setEmail(text); if (emailError) setEmailError(''); }}
              placeholder="you@example.com"
              placeholderTextColor={placeholderColor}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="flex-1 py-3.5 ml-3 text-sm font-semibold text-slate-900 dark:text-white"
            />
          </View>
          {emailError ? <Text className="text-xs font-semibold text-red-500 mt-1.5 ml-1">{emailError}</Text> : null}
        </View>

        {/* PASSWORD INPUT */}
        <View className="mb-4">
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Password</Text>
          <View className={`flex-row items-center bg-white dark:bg-secondary rounded-2xl px-4 border ${passwordError ? 'border-red-400 dark:border-red-500' : 'border-slate-100 dark:border-slate-700/50'}`}>
            <Feather name="lock" size={18} color={passwordError ? '#EF4444' : placeholderColor} />
            <TextInput
              value={password}
              onChangeText={(text) => { setPassword(text); if (passwordError) setPasswordError(''); }}
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
          {passwordError ? <Text className="text-xs font-semibold text-red-500 mt-1.5 ml-1">{passwordError}</Text> : null}
        </View>

        {/* CONFIRM PASSWORD INPUT */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Confirm Password</Text>
          <View className={`flex-row items-center bg-white dark:bg-secondary rounded-2xl px-4 border ${confirmError ? 'border-red-400 dark:border-red-500' : 'border-slate-100 dark:border-slate-700/50'}`}>
            <Feather name="lock" size={18} color={confirmError ? '#EF4444' : placeholderColor} />
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => { setConfirmPassword(text); if (confirmError) setConfirmError(''); }}
              placeholder="Re-enter your password"
              placeholderTextColor={placeholderColor}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              className="flex-1 py-3.5 ml-3 text-sm font-semibold text-slate-900 dark:text-white"
            />
          </View>
          {confirmError ? <Text className="text-xs font-semibold text-red-500 mt-1.5 ml-1">{confirmError}</Text> : null}
        </View>

        {/* SIGN UP BUTTON */}
        <TouchableOpacity
          onPress={handleSignUp}
          disabled={isSubmitting}
          className="bg-primary rounded-2xl py-4 items-center mb-4"
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? <ActivityIndicator color="white" /> : <Text className="text-white font-black text-sm">Create Account</Text>}
        </TouchableOpacity>

        {/* DIVIDER */}
        <View className="flex-row items-center my-2">
          <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-700" />
          <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 mx-3">OR</Text>
          <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-700" />
        </View>

        {/* GOOGLE SIGN UP */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white rounded-2xl py-4 mt-4 border border-slate-200"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
        >
          <GoogleIcon />
          <Text className="text-sm font-semibold text-[#3C4043] ml-3">Sign up with Google</Text>
        </TouchableOpacity>

        {/* SIGN IN LINK */}
        <View className="flex-row justify-center items-center mt-8 mb-6">
          <Text className="text-sm font-medium text-slate-400 dark:text-slate-500">Already have an account?</Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity className="ml-1.5">
              <Text className="text-sm font-black text-primary">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}