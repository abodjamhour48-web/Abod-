# تطبيق آلة ثني أسلاك تقويم الأسنان 🦷
# Orthodontic Wire Bending Machine App

تطبيق موبايل احترافي وسهل للتحكم في آلات ثني أسلاك تقويم الأسنان

## ⚡ التكنولوجيا المستخدمة

- **React Native** - تطبيق موبايل متعدد الأنظمة (iOS + Android)
- **Expo** - بيئة تطوير سهلة وسريعة
- **Firebase** - قاعدة بيانات سحابية
- **Redux** - إدارة الحالة

## 🎯 الميزات الرئيسية

1. **حساب الزوايا** 📐
   - إدخال مواصفات السلك
   - حساب تلقائي للزوايا
   - معاينة فورية

2. **التحكم بالآلة** 🔧
   - الاتصال عبر Bluetooth
   - إرسال الأوامر مباشرة
   - مراقبة الحالة

3. **إدارة المشاريع** 📁
   - حفظ المشاريع
   - تحرير المشاريع
   - استنساخ التصاميم

4. **التقارير** 📊
   - إحصائيات الإنتاج
   - تصدير البيانات
   - سجل العمليات

## 📦 هيكل المشروع

```
Abod-/
├── app/                          # الملفات الرئيسية
│   ├── screens/                  # شاشات التطبيق
│   │   ├── HomeScreen.js         # الشاشة الرئيسية
│   │   ├── CalculatorScreen.js   # حاسبة الزوايا
│   │   ├── ControlScreen.js      # التحكم بالآلة
│   │   ├── ProjectsScreen.js     # إدارة المشاريع
│   │   └── ReportsScreen.js      # التقارير
│   ├── components/               # مكونات معاد استخدامها
│   │   ├── Header.js
│   │   ├── Button.js
│   │   ├── Card.js
│   │   └── Input.js
│   ├── services/                 # خدمات التطبيق
│   │   ├── firebaseService.js    # اتصال Firebase
│   │   ├── bluetoothService.js   # اتصال Bluetooth
│   │   └── calculatorService.js  # حسابات الزوايا
│   ├── navigation/               # نظام التنقل
│   │   └── Navigation.js
│   ├── redux/                    # إدارة الحالة
│   │   ├── store.js
│   │   ├── slices/
│   │   │   ├── projectsSlice.js
│   │   │   ├── settingsSlice.js
│   │   │   └── machineSlice.js
│   ├── utils/                    # دوال مساعدة
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   └── App.js                    # ملف التطبيق الرئيسي
├── assets/                       # الصور والأيقونات
│   ├── images/
│   └── icons/
├── app.json                      # إعدادات Expo
├── package.json                  # المكتبات المستخدمة
└── README.md                     # هذا الملف
```

## 🚀 البدء السريع

### 1️⃣ التثبيت
```bash
# تثبيت Expo CLI
npm install -g expo-cli

# تثبيت المكتبات
npm install
```

### 2️⃣ تشغيل التطبيق
```bash
# بدء التطبيق
expo start

# أو مباشرة
npm start
```

### 3️⃣ الاختبار
```bash
# على الهاتف: امسح QR Code بتطبيق Expo Go
# أو على المحاكي: اضغط 'a' للـ Android أو 'i' للـ iOS
```

## 📋 المكتبات المستخدمة

```json
{
  "react-native": "^0.73.0",
  "react": "^18.2.0",
  "expo": "^50.0.0",
  "@react-navigation/native": "^6.1.0",
  "@react-navigation/bottom-tabs": "^6.5.0",
  "firebase": "^10.0.0",
  "@reduxjs/toolkit": "^1.9.7",
  "react-redux": "^8.1.3",
  "react-native-gesture-handler": "^2.14.0",
  "react-native-reanimated": "^3.5.0",
  "react-native-svg": "^13.14.0"
}
```

## 🔐 الأمان

- ✅ التحقق من البيانات
- ✅ تشفير كلمات المرور
- ✅ مصادقة Firebase
- ✅ حفظ آمن للبيانات

## 📞 دعم Bluetooth

- الاتصال التلقائي بالآلة
- إعادة الاتصال عند القطع
- تسجيل عمليات الاتصال

## 📊 قاعدة البيانات (Firebase)

### Collections:
- **users** - بيانات المستخدمين
- **projects** - المشاريع المحفوظة
- **calculations** - سجل الحسابات
- **reports** - التقارير والإحصائيات

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
npm test

# تغطية الكود
npm run coverage
```

## 📱 متطلبات النظام

- **Android**: 8.0 أو أحدث
- **iOS**: 13.0 أو أحدث
- **RAM**: 2GB على الأقل

## 📝 ملاحظات التطوير

1. **Expo Go** - لاختبار التطبيق بسرعة
2. **Firebase Console** - لإدارة قاعدة البيانات
3. **Redux DevTools** - لتتبع الحالة

## 🤝 المساهمة

```bash
# 1. إنشاء فرع جديد
git checkout -b feature/your-feature

# 2. عمل Commit
git commit -m "Add: your feature"

# 3. Push الفرع
git push origin feature/your-feature

# 4. فتح Pull Request
```

## 📄 الترخيص

MIT License - استخدم حراً وبكل أمان ✨

---

## ✅ التالي في البناء:

- [ ] إنشاء ملف `package.json`
- [ ] إنشاء شاشة البيت
- [ ] إنشاء حاسبة الزوايا
- [ ] إعداد Firebase
- [ ] إضافة Bluetooth
- [ ] إنشاء قاعدة البيانات

تابع معنا! 🚀
