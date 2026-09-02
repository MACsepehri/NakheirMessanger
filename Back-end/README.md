# Backend Setup — Nakheir Messenger

این راهنما برای راه‌اندازی Backend پروژه‌ی **Nakheir Messenger** نوشته شده است.

Backend با این تکنولوژی‌ها کار می‌کند:
 
* Node.js
* Express.js
* MariaDB / MySQL
* Prisma ORM 7
* Prisma Client
* bcrypt
* dotenv

---

# 1. دریافت پروژه

ابتدا Repository را Clone کنید:

```bash
git clone <repository-url>
cd NakheirMessanger/Back-end
```

**مهم:** تمام دستورات Prisma باید از داخل پوشه‌ی `Back-end` اجرا شوند، نه از ریشه‌ی `NakheirMessanger`.

ساختار کلی پروژه:

```text
NakheirMessanger/
├── Back-end/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── prisma.config.ts
│   ├── package.json
│   ├── .env
│   └── ...
│
└── ...
```

---

# 2. نصب Dependencyها

اگر `package.json` موجود است، نیازی به نصب دستی Prisma یا سایر packageها نیست.

فقط اجرا کنید:

```bash
npm install
```

این دستور تمام dependencyهای مورد نیاز پروژه را نصب می‌کند.

Dependencyهای اصلی پروژه:

```json
{
  "dependencies": {
    "@prisma/adapter-mariadb": "^7.10.0",
    "@prisma/client": "^7.10.0",
    "bcrypt": "^6.0.0",
    "cors": "^2.8.6",
    "crypto": "^1.0.1",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mariadb": "^3.5.3"
  },
  "devDependencies": {
    "prisma": "^7.10.0"
  }
}
```

**Prisma را جداگانه با `npm install prisma` نصب نکنید.**

همچنین Prisma 8 RC یا نسخه‌های `dev` را نصب نکنید.

برای بررسی نسخه:

```bash
npx prisma --version
```

باید نسخه‌ی Prisma در محدوده‌ی 7.x باشد، مثلاً:

```text
7.10.0
```

همچنین:

```bash
npm list prisma @prisma/client
```

باید نسخه‌های هماهنگ Prisma را نشان دهد.

---

# 3. نصب و تنظیم Database

پروژه از MariaDB/MySQL استفاده می‌کند.

اطمینان حاصل کنید Database Server نصب و اجرا شده است.

مثلاً برای بررسی MariaDB:

```bash
systemctl status mariadb
```

یا:

```bash
sudo systemctl start mariadb
```

سپس یک Database برای پروژه ایجاد کنید.

مثلاً:

```sql
CREATE DATABASE nakheir;
```

نام Database می‌تواند متفاوت باشد، اما باید در Connection URL همان نام استفاده شود.

---

# 4. ساخت `.env`

در ریشه‌ی `Back-end` یک فایل `.env` ایجاد کنید:

```text
Back-end/
├── .env
├── package.json
├── prisma.config.ts
└── prisma/
    └── schema.prisma
```

داخل `.env` Connection URL دیتابیس را قرار دهید.

مثلاً:

```env
DB_URL="mysql://USERNAME:PASSWORD@127.0.0.1:3306/nakheir"
```

مقادیر زیر را با اطلاعات سیستم خودتان جایگزین کنید:

```text
USERNAME
PASSWORD
DATABASE NAME
```

**فایل `.env` نباید commit شود.**

اطمینان حاصل کنید که `.env` در `.gitignore` قرار دارد.

---

# 5. ساخت `prisma.config.ts`

در **ریشه‌ی Back-end** فایل زیر باید وجود داشته باشد:

```text
Back-end/prisma.config.ts
```

نه اینجا:

```text
NakheirMessanger/prisma.config.ts
```

و نه داخل:

```text
Back-end/prisma/prisma.config.ts
```

محتوای `prisma.config.ts`:

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DB_URL"),
  },
});
```

`prisma.config.ts` وظیفه‌ی تنظیم Connection URL برای Prisma را دارد.

---

# 6. تنظیم `schema.prisma`

فایل Schema باید در این مسیر باشد:

```text
Back-end/prisma/schema.prisma
```

در Prisma 7، Connection URL را داخل `schema.prisma` قرار ندهید.

یعنی این حالت استفاده نشود:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DB_URL")
}
```

به جای آن:

```prisma
datasource db {
  provider = "mysql"
}
```

یک نمونه Schema:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
}

model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
}
```

Schema واقعی پروژه باید مطابق مدل‌های واقعی Backend تنظیم شود.

---

# 7. بررسی Prisma

قبل از Migration، ابتدا Schema را Validate کنید:

```bash
npx prisma validate
```

اگر همه‌چیز درست باشد، باید چیزی شبیه این مشاهده شود:

```text
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.
The schema at prisma/schema.prisma is valid
```

اگر Prisma گفت:

```text
Could not find Prisma Schema
```

ابتدا مسیر فایل‌ها را بررسی کنید:

```text
Back-end/
├── prisma/
│   └── schema.prisma
└── prisma.config.ts
```

و مطمئن شوید دستور را از داخل `Back-end` اجرا می‌کنید.

---

# 8. Generate کردن Prisma Client

بعد از Validate:

```bash
npx prisma generate
```

Prisma Client طبق `schema.prisma` ساخته می‌شود.

در configuration فعلی خروجی در این مسیر قرار می‌گیرد:

```text
Back-end/generated/prisma/
```

---

# 9. ساخت Migration

اگر Database جدید و خالی است:

```bash
npx prisma migrate dev --name init
```

این دستور Migration اولیه را ایجاد و روی Database اعمال می‌کند.

پس از آن ساختار پروژه چیزی شبیه این خواهد شد:

```text
Back-end/
├── generated/
│   └── prisma/
├── prisma/
│   ├── migrations/
│   │   └── ...
│   └── schema.prisma
├── prisma.config.ts
├── .env
└── package.json
```

---

# 10. اگر هنگام Migration با `Drift detected` مواجه شدید

اگر چنین پیغامی دیدید:

```text
Drift detected: Your database schema is not in sync with your migration history.
```

**فوراً `prisma migrate reset` اجرا نکنید.**

این پیام معمولاً یعنی Database قبلاً جدول‌هایی دارد که در Migration History فعلی Prisma ثبت نشده‌اند.

مثلاً:

```text
[+] Added tables
  - users
```

اگر Database قبلاً اطلاعات مهم دارد، این دستور خطرناک است:

```bash
npx prisma migrate reset
```

چون Database را Reset می‌کند و **اطلاعات آن از بین می‌رود**.

اگر Database صرفاً یک Database توسعه‌ای و قابل حذف است، می‌توان از:

```bash
npx prisma migrate reset
```

استفاده کرد.

اما اگر اطلاعات مهم است، ابتدا باید وضعیت Database و `schema.prisma` بررسی شود.

---

# 11. نکته مهم درباره نسخه Prisma

این پروژه از Prisma 7 استفاده می‌کند.

در زمان نصب ممکن است npm پیامی شبیه این نشان دهد:

```text
Update available 7.10.0 -> 8.0.0-rc.12
```

این پیام به معنی نیاز به Upgrade نیست.

**Prisma 8 RC را نصب نکنید.**

همچنین این دستورات را بدون هماهنگی با تیم اجرا نکنید:

```bash
npm install prisma@latest
npm install @prisma/client@latest
```

چون ممکن است نسخه‌ی Prisma پروژه را تغییر دهند.

نسخه‌های Prisma و Client باید هماهنگ باشند:

```text
prisma
   │
   └── 7.10.0

@prisma/client
   │
   └── 7.10.0
```

---

# نصب سریع برای اعضای تیم

اگر Repository را تازه Clone کرده‌اید و فایل‌های پروژه، `package.json`، `schema.prisma` و `prisma.config.ts` از قبل وجود دارند، مراحل اصلی فقط این‌ها هستند:

```bash
cd NakheirMessanger/Back-end

npm install

npx prisma validate

npx prisma generate
```

سپس بعد از تنظیم `.env` و آماده بودن Database:

```bash
npx prisma migrate dev
```

**اگر Migrationهای پروژه از قبل در Repository وجود دارند، قبل از ساخت Migration جدید وضعیت آن‌ها را بررسی کنید.**

---

# Checklist

قبل از اجرای Backend:

* [ ] داخل `Back-end` هستم.
* [ ] `npm install` با موفقیت اجرا شده است.
* [ ] `prisma` و `@prisma/client` نسخه‌ی هماهنگ دارند.
* [ ] MariaDB/MySQL در حال اجراست.
* [ ] Database ساخته شده است.
* [ ] `.env` ساخته شده است.
* [ ] `DB_URL` در `.env` صحیح است.
* [ ] `prisma.config.ts` در ریشه‌ی `Back-end` است.
* [ ] `prisma/schema.prisma` وجود دارد.
* [ ] `npx prisma validate` موفق شده است.
* [ ] `npx prisma generate` موفق شده است.
* [ ] Migrationهای موجود بررسی شده‌اند.

بعد از انجام این مراحل، می‌توانید Backend را اجرا کنید.
