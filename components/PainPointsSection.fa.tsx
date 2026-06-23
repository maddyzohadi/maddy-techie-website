import { RefreshCw, BrainCircuit, MessageCircle, AlertTriangle } from "lucide-react";

const cards = [
  {
    icon: RefreshCw,
    title: "کارهای تکراری",
    body: "ساعت‌ها وقتت رو صرف کپی کردن داده، جواب دادن به پیام‌ها، ساختن سند یا آپدیت کردن دستی جداول می‌کنی.",
  },
  {
    icon: BrainCircuit,
    title: "اضافه‌بار ذهنی",
    body: "اطلاعات خیلی زیاده، نمی‌دونی از کجا شروع کنی یا چی یاد بگیری.",
  },
  {
    icon: MessageCircle,
    title: "AI رو فقط برای سوال پرسیدن استفاده می‌کنی",
    body: "می‌دونی AI قدرتمنده، ولی تا حالا مثل یه موتور جستجوی پیشرفته ازش استفاده کردی. هنوز نشده که واقعاً برات کار کنه.",
  },
  {
    icon: AlertTriangle,
    title: "این مهارت، تو رو از بقیه جدا می‌کنه",
    body: "AI داره روش کار کردن رو عوض می‌کنه. یاد گرفتنش دیگه انتخابی نیست — این همونیه که بین اونایی که پیش می‌رن و اونایی که جا می‌مونن فرق می‌ذاره.",
  },
];

export default function PainPointsSectionFA() {
  return (
    <section className="py-24 px-6 bg-[#FAF7F2]" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-['Noto_Naskh_Arabic'] text-4xl text-[#1A1A1A] mb-4 leading-relaxed">
            آیا این برات آشناست؟
          </h2>
          <p className="text-[#555] text-lg max-w-xl mx-auto leading-loose font-['Noto_Naskh_Arabic']">
            اینا مشکلاتیه که هزاران متخصص هر روز باهاشون دست و پنجه نرم می‌کنن.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="relative bg-white border border-[#E8E3DA] rounded-2xl p-7 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[3px] h-full bg-[#C85A2A] rounded-r-2xl" />
              <Icon size={22} strokeWidth={1.5} className="text-[#C85A2A] mb-4" />
              <h3 className="font-['Noto_Naskh_Arabic'] text-xl text-[#1A1A1A] mb-3 leading-relaxed">
                {title}
              </h3>
              <p className="text-[#666] text-sm leading-loose font-['Noto_Naskh_Arabic']">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
