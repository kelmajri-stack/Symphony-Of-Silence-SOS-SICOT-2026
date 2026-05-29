# Symphony Of Silence - SOS SICOT 2026

منصة بحثية وتجريبية لاستكشاف التفاعل المعرفي والتفاوض بين البشر والنماذج الذكية.

## 🚀 الميزات الرئيسية

✅ **واجهة مستخدم حديثة** - تصميم جميل وتفاعلي
✅ **Backend آمن** - API Gateway مع Vercel Functions
✅ **مصادقة آمنة** - نظام JWT Token
✅ **دعم العربية** - UTF-8 بشكل صحيح
✅ **API Integration** - تكامل آمن مع Anthropic

## 🔧 البنية التقنية

```
Frontend (HTML/CSS/JS)
         ↓
Backend (Vercel Serverless Functions)
         ↓
Anthropic API (آمن من الخادم)
```

## 📝 كيفية الاستخدام

### 1. التثبيت المحلي

```bash
git clone https://github.com/kelmajri-stack/Symphony-Of-Silence-SOS-SICOT-2026.git
cd Symphony-Of-Silence-SOS-SICOT-2026
npm install
```

### 2. إعداد متغيرات البيئة

أنشئ ملف `.env.local`:

```
ANTHROPIC_API_KEY=your-api-key-here
AUTH_USERNAME=admin
AUTH_PASSWORD_HASH=your-hashed-password
JWT_SECRET=your-secret-key
```

### 3. النشر على Vercel

```bash
npm install -g vercel
vercel
```

### 4. تفعيل GitHub Pages

```
Settings → Pages → Deploy from a branch → main
```

## 🔒 الأمان

- ✅ لا يتم تخزين مفاتيح API في الواجهة الأمامية
- ✅ استخدام JWT Tokens للمصادقة
- ✅ كلمات مرور مشفرة بـ SHA-256
- ✅ CORS معطّل بشكل آمن

## 📚 الملفات الرئيسية

- `index.html` - الصفحة الرئيسية
- `api/chat.js` - API للدردشة الآمنة
- `api/auth.js` - نظام المصادقة
- `vercel.json` - إعدادات النشر
- `_config.yml` - إعدادات GitHub Pages

## 🌐 الروابط

- **الموقع الحي:** https://kelmajri-stack.github.io/Symphony-Of-Silence-SOS-SICOT-2026/
- **GitHub:** https://github.com/kelmajri-stack/Symphony-Of-Silence-SOS-SICOT-2026
- **Anthropic API:** https://www.anthropic.com/api

## 📄 الترخيص

جميع الحقوق محفوظة © 2026 Symphony Of Silence

---

**آخر تحديث:** 2026-05-29
**الإصدار:** 1.0.0