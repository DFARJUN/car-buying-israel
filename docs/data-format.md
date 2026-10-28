# מבנה נתוני ההשוואה

דוגמה מלאה: [comparison.json](../examples/comparison.json). כל ערכי הדוגמה פיקטיביים. הגרסה הנוכחית היא `version: 1`; עד 500 רכבים וקובץ ייבוא עד 2MB.

| חלק | תוכן |
|---|---|
| `settings` | `usage`, `must_haves`, `top_priority`, `months`, תקרת רכישה `budget`, ק״מ מרבי `max_km`, `automatic_only`, ומשקולות `weights` |
| `cars[]` | רשימת מועמדים עם `id` ייחודי |
| פרטי מועמד | `name`, `variant`, `plate`, `year`, `km`, `price`, `purchase_type`, `fuel`, `transmission` |
| מצב | `status`, `hidden`, דירוג אישי `personal_rating` בין 1-5 או null |
| מחקר ודירוג | `model_research`, `vehicle_research`, `rating_origin`: ai / personal / demo / unknown |
| ראיות | `source_url`, `checked_at` בפורמט YYYY-MM-DD, `notes`, `flags` |
| `scores` | חמישה ממדים: `reliability`, `resale`, `space`, `safety`, `running_cost`; בכל אחד `value` ו־`reason` |
| `costs` | `horizon_months`, `resale`, `resale_low`, `resale_high`, `one_time`, `annual`, `loan`, `assumptions` |
| `annual` | `energy`, `insurance`, `licensing`, `service`, `repairs`, `other`, כל אחד לשנה |
| `loan` | null למזומן, או `principal`, `annual_rate` באחוזים, `months`, `balloon`, `fees` |

סוג רכישה: `used`, `new`, `zero-km`. הנעה: `petrol`, `diesel`, `hybrid`, `electric`, `other`, `unknown`. תיבה: `automatic`, `manual`, `unknown`.

סטטוסים: לבדוק, בקשר, ראינו, הצעה פתוחה, ירד, נמכר, נקנה. הסתרה אינה מחיקה ואינה משנה סטטוס.

כל השדות בדוגמה נדרשים. טקסט לא ידוע נשאר ריק, מספר לא ידוע הוא null. במספרים לא כותבים סימן שקל או פסיקים. בציון ממד, `reason` כולל את ההסבר וקישורי המקורות; אל תזינו ציון ללא מקור או הסבר להערכה.

## עבודה עם אייג׳נט

האייג׳נט מעדכן בעצמו את `my-car/comparison.json` באמצעות `tools/save-comparison.mjs`. האתר קורא אותו כל חמש שניות במצב קריאה בלבד. אין צורך בייבוא או הזנה ידנית.

שדה `summary` מכיל טקסטים: `stage`, `recommendation`, `rationale`, `tradeoff`, `next_action`, `updated_at`, `coverage`. זה הסיכום בראש האתר. המחקר המלא והיסטוריית ההחלטות נשמרים בתיק הפרטי.

הפקודה שומרת גרסה קודמת ב־`my-car/history/`. הקבצים והגיבויים אינם נכנסים ל־Git.

כלים ידניים קיימים רק כחלופה כשאין קובץ אייג׳נט מחובר: במצב הזה הנתונים נשמרים בדפדפן, וייצוא JSON נדרש כדי להעביר אותם לסוכן או למכשיר אחר. ייבוא מחליף את הרשימה לאחר אישור; הוא אינו מיזוג. לפני מעבר מהמסלול הידני לאייג׳נט יש למסור לו את הייצוא האחרון.
