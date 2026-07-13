/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Phone, Calendar, Clock, MapPin, CheckCircle2, Globe } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Language = 'en' | 'fr' | 'ar';

const translations = {
  en: {
    nav: { about: "About", services: "Services", clinic: "The Clinic", book: "Book Consultation" },
    hero: {
      badge: "Welcome to Gentle Care",
      titlePart1: "Gentle care for your ",
      titleHighlight: "radiant",
      titlePart2: " smile.",
      desc: "Experience dentistry in a calm, welcoming environment. We combine modern technology with a holistic approach to ensure your comfort and well-being.",
      book: "Book Consultation"
    },
    stats: {
      next: "Next Available",
      date: "Monday, Sept 14",
      rating: "Rating"
    },
    about: {
      title: "A mindful approach to dentistry",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      services: [
        { title: "Comprehensive Exams", desc: "Discover more" },
        { title: "Aesthetic Dentistry", desc: "Discover more" },
        { title: "Restorative Care", desc: "Discover more" }
      ]
    },
    clinic: {
      title: "Designed for your peace of mind.",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
      features: [
        "State-of-the-art diagnostic technology",
        "Stress-free environment and amenities",
        "Personalized treatment planning",
        "Experienced, compassionate staff"
      ]
    },
    booking: {
      title: "Request an Appointment",
      desc: "Fill out the form below to request a consultation. We will contact you to confirm.",
      name: "Full Name",
      email: "Email Address",
      service: "Service Interested In",
      date: "Preferred Date",
      submit: "Submit Request",
      successTitle: "Request Received",
      successDesc: "Thank you for reaching out! Our team will contact you shortly to confirm your appointment.",
      newRequest: "Make another request",
      placeholderService: "Select a service",
      pickDate: "Pick a date"
    },
    footer: {
      desc: "Providing exceptional dental care in a serene and modern environment. Your smile is our priority.",
      contact: "Contact",
      address: "123 Wellness Ave, Suite 100",
      city: "San Francisco, CA 94103",
      hours: "Hours",
      weekdays: "Mon - Fri: 8am - 6pm",
      weekend: "Sat: 9am - 2pm",
      closed: "Sun: Closed"
    }
  },
  fr: {
    nav: { about: "À propos", services: "Services", clinic: "La Clinique", book: "Prendre Rendez-vous" },
    hero: {
      badge: "Bienvenue aux Soins Doux",
      titlePart1: "Des soins doux pour un sourire ",
      titleHighlight: "éclatant",
      titlePart2: ".",
      desc: "Vivez la dentisterie dans un environnement calme et accueillant. Nous combinons la technologie moderne avec une approche holistique pour assurer votre confort et votre bien-être.",
      book: "Prendre Rendez-vous"
    },
    stats: {
      next: "Prochain Disponible",
      date: "Lundi 14 Sept",
      rating: "Évaluation"
    },
    about: {
      title: "Une approche consciente de la dentisterie",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      services: [
        { title: "Examens Complets", desc: "Découvrir plus" },
        { title: "Dentisterie Esthétique", desc: "Découvrir plus" },
        { title: "Soins Restaurateurs", desc: "Découvrir plus" }
      ]
    },
    clinic: {
      title: "Conçu pour votre tranquillité d'esprit.",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
      features: [
        "Technologie de diagnostic de pointe",
        "Environnement sans stress et commodités",
        "Planification de traitement personnalisée",
        "Personnel expérimenté et compatissant"
      ]
    },
    booking: {
      title: "Demander un Rendez-vous",
      desc: "Remplissez le formulaire ci-dessous pour demander une consultation. Nous vous contacterons pour confirmer.",
      name: "Nom Complet",
      email: "Adresse Email",
      service: "Service Souhaité",
      date: "Date Souhaitée",
      submit: "Soumettre la Demande",
      successTitle: "Demande Reçue",
      successDesc: "Merci de nous avoir contactés ! Notre équipe vous contactera sous peu pour confirmer votre rendez-vous.",
      newRequest: "Faire une autre demande",
      placeholderService: "Sélectionnez un service",
      pickDate: "Choisir une date"
    },
    footer: {
      desc: "Fournir des soins dentaires exceptionnels dans un environnement serein et moderne. Votre sourire est notre priorité.",
      contact: "Contact",
      address: "123 Avenue Wellness, Suite 100",
      city: "San Francisco, CA 94103",
      hours: "Horaires",
      weekdays: "Lun - Ven : 8h - 18h",
      weekend: "Sam : 9h - 14h",
      closed: "Dim : Fermé"
    }
  },
  ar: {
    nav: { about: "من نحن", services: "الخدمات", clinic: "العيادة", book: "احجز استشارة" },
    hero: {
      badge: "مرحباً بكم في الرعاية اللطيفة",
      titlePart1: "رعاية لطيفة لابتسامتك ",
      titleHighlight: "المشرقة",
      titlePart2: ".",
      desc: "جرب طب الأسنان في بيئة هادئة وترحيبية. نحن نجمع بين التكنولوجيا الحديثة والنهج الشامل لضمان راحتك ورفاهيتك.",
      book: "احجز استشارة"
    },
    stats: {
      next: "الموعد التالي",
      date: "الاثنين، 14 سبتمبر",
      rating: "التقييم"
    },
    about: {
      title: "نهج واعي لطب الأسنان",
      desc: "لوريم إيبسوم دولار سيت أميت، كونسيكتيتور أديبيسينغ إيليت. سيد دو إيوسمود تيمبور إنكيديدونت أوت لابوري إت دولوري ماجنا أليكوا. أوت إنيم أد مينيم فينيام، كيس نوسترود إكسيرسيتاسيون أُولامكو لابوريس نيسي أوت أليكويب إكس إيا كومودو كونسيكوات.",
      services: [
        { title: "فحوصات شاملة", desc: "اكتشف المزيد" },
        { title: "طب الأسنان التجميلي", desc: "اكتشف المزيد" },
        { title: "الرعاية الترميمية", desc: "اكتشف المزيد" }
      ]
    },
    clinic: {
      title: "مصمم لراحة بالك.",
      desc: "لوريم إيبسوم دولار سيت أميت، كونسيكتيتور أديبيسينغ إيليت. إنتيجير نيك أوديو. برايسينت ليبيرو. سيد كورسوس أنتي دابيبوس ديام. سيد نيسي. نولا كيس سيم أت نيبه إليمينتوم إمبيرديت.",
      features: [
        "أحدث تقنيات التشخيص",
        "بيئة خالية من التوتر ووسائل راحة",
        "تخطيط علاج مخصص",
        "طاقم عمل متمرس ومتعاطف"
      ]
    },
    booking: {
      title: "طلب موعد",
      desc: "املأ النموذج أدناه لطلب استشارة. سنتصل بك لتأكيد الموعد.",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      service: "الخدمة المطلوبة",
      date: "التاريخ المفضل",
      submit: "إرسال الطلب",
      successTitle: "تم استلام الطلب",
      successDesc: "شكرًا لتواصلك معنا! سيتصل بك فريقنا قريبًا لتأكيد موعدك.",
      newRequest: "تقديم طلب آخر",
      placeholderService: "اختر خدمة",
      pickDate: "اختر تاريخاً"
    },
    footer: {
      desc: "تقديم رعاية أسنان استثنائية في بيئة هادئة وحديثة. ابتسامتك هي أولويتنا.",
      contact: "اتصل بنا",
      address: "123 شارع العافية، جناح 100",
      city: "سان فرانسيسكو، كاليفورنيا 94103",
      hours: "ساعات العمل",
      weekdays: "الاثنين - الجمعة: 8 ص - 6 م",
      weekend: "السبت: 9 ص - 2 م",
      closed: "الأحد: مغلق"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (browserLang === 'fr') setLang('fr');
    else if (browserLang === 'ar') setLang('ar');
    else setLang('en');
  }, []);

  const t = translations[lang];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-emerald-50/40 text-emerald-800 font-sans selection:bg-emerald-200 ${lang === 'ar' ? 'font-sans' : ''}`}>
      {/* Navigation */}
      <nav className="fixed w-full bg-white/60 backdrop-blur-[12px] z-50 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="text-xl font-heading font-semibold tracking-tight text-emerald-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            </div>
            Aura Dental
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-emerald-600">
            <a href="#about" className="hover:text-emerald-800 transition-colors">{t.nav.about}</a>
            <a href="#services" className="hover:text-emerald-800 transition-colors">{t.nav.services}</a>
            <a href="#clinic" className="hover:text-emerald-800 transition-colors">{t.nav.clinic}</a>
          </div>
          <div className="flex items-center gap-4">
            <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative group flex items-center">
              <Select value={lang} onValueChange={(val) => setLang(val as Language)}>
                <SelectTrigger className="w-[110px] bg-transparent border-none shadow-none text-emerald-600 font-medium hover:text-emerald-800 focus:ring-0">
                  <Globe className="w-4 h-4 shrink-0 mr-2" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <a href="#booking" className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs tracking-wider uppercase font-semibold px-8 py-3 h-auto hover:bg-emerald-700 transition-all cursor-pointer border-none">
              {t.nav.book}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 md:pt-56 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-xl space-y-8"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-widest border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.hero.badge}
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-7xl font-light leading-[1.1] text-emerald-800 tracking-tight">
              {t.hero.titlePart1}<span className="italic text-emerald-800">{t.hero.titleHighlight}</span>{t.hero.titlePart2}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-emerald-600 leading-relaxed max-w-md font-light">
              {t.hero.desc}
            </motion.p>
            <motion.div variants={fadeUp as any} className="flex gap-4 items-center pt-4">
              <a href="#booking" className="inline-flex items-center justify-center rounded-full px-8 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white cursor-pointer transition-all text-xs tracking-wider uppercase font-semibold h-12">
                {t.hero.book}
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={`relative h-[480px] md:h-[600px] w-full max-w-md ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`}
          >
            <div className="absolute inset-0 bg-emerald-50 rounded-[60px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80" 
                alt="Modern dental clinic interior" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-900/10 mix-blend-multiply"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/60 backdrop-blur-[12px] border border-white/30 p-6 rounded-3xl flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-emerald-600 font-bold">{t.stats.next}</p>
                  <p className="text-lg font-heading font-medium text-emerald-800">{t.stats.date}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-white shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={lang === 'ar' ? 'rotate-180' : ''}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </div>
            <div className={`absolute -top-6 ${lang === 'ar' ? '-left-6' : '-right-6'} w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-lg border border-emerald-100 z-10`}>
              <span className="text-2xl font-bold text-emerald-500">4.9</span>
              <span className="text-[10px] uppercase text-emerald-500 tracking-tighter">{t.stats.rating}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="services" className="py-32 md:py-48 bg-white border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-emerald-800 font-light">{t.about.title}</h2>
            <p className="text-emerald-600 leading-relaxed text-lg font-light">
              {t.about.desc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: "https://images.unsplash.com/photo-1598256989800-fea5ce590a8a?auto=format&fit=crop&w=600&q=80" },
              { img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80" },
              { img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                }}
                className="group cursor-pointer block"
              >
                <Card className="border-none shadow-none bg-transparent group-hover:bg-emerald-50 transition-colors duration-500 rounded-[2.5rem] overflow-hidden">
                  <CardContent className="p-4">
                    <div className="relative h-[400px] mb-6 rounded-[2rem] overflow-hidden bg-emerald-100">
                      <img 
                        src={item.img} 
                        alt={t.about.services[i].title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="px-2">
                      <h3 className="font-heading text-2xl font-medium mb-2 text-emerald-800">{t.about.services[i].title}</h3>
                      <p className="text-emerald-500 text-sm">{t.about.services[i].desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Clinic Section */}
      <section id="clinic" className="py-32 md:py-48 bg-emerald-50/40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="order-2 md:order-1"
          >
            <div className="relative h-[600px] rounded-[60px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80" 
                alt="Doctor consulting" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="order-1 md:order-2"
          >
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl mb-8 leading-tight text-emerald-800 font-light">
              {t.clinic.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-emerald-600 mb-8 leading-relaxed text-lg font-light">
              {t.clinic.desc}
            </motion.p>
            <motion.div variants={staggerContainer} className="space-y-4">
              {t.clinic.features.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-emerald-800">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-32 md:py-48 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-6 font-light text-white">{t.booking.title}</h2>
            <p className="text-emerald-100/70 leading-relaxed text-lg font-light max-w-2xl mx-auto">
              {t.booking.desc}
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Card className="border-none shadow-2xl bg-white text-emerald-800 rounded-[2.5rem] overflow-hidden">
              {isSubmitted ? (
                <CardContent className="p-16 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-3xl font-medium">{t.booking.successTitle}</h3>
                  <p className="text-emerald-600 font-light max-w-md mx-auto">{t.booking.successDesc}</p>
                  <Button 
                    variant="outline" 
                    className="mt-8 rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 h-12 px-8 uppercase tracking-widest text-xs font-semibold cursor-pointer"
                    onClick={() => setIsSubmitted(false)}
                  >
                    {t.booking.newRequest}
                  </Button>
                </CardContent>
              ) : (
                <CardContent className="p-8 md:p-12">
                  <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-emerald-600 text-xs uppercase tracking-widest font-semibold">{t.booking.name}</Label>
                        <Input id="name" required className="h-14 border-emerald-200 focus-visible:ring-emerald-600 rounded-2xl bg-emerald-50/50 px-4" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-emerald-600 text-xs uppercase tracking-widest font-semibold">{t.booking.email}</Label>
                        <Input id="email" type="email" required className="h-14 border-emerald-200 focus-visible:ring-emerald-600 rounded-2xl bg-emerald-50/50 px-4" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="space-y-3">
                        <Label className="text-emerald-600 text-xs uppercase tracking-widest font-semibold">{t.booking.service}</Label>
                        <Select required>
                          <SelectTrigger className="h-14 border-emerald-200 focus:ring-emerald-600 rounded-2xl bg-emerald-50/50 px-4">
                            <SelectValue placeholder={t.booking.placeholderService} />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-emerald-100 shadow-xl">
                            {t.about.services.map((s, i) => (
                              <SelectItem key={i} value={s.title} className="rounded-xl focus:bg-emerald-50 cursor-pointer">{s.title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3 flex flex-col">
                        <Label className="text-emerald-600 text-xs uppercase tracking-widest font-semibold">{t.booking.date}</Label>
                        <Popover>
                          <PopoverTrigger
                            className={cn(
                              buttonVariants({ variant: "outline" }),
                              "w-full h-14 justify-start text-left font-normal border-emerald-200 rounded-2xl bg-emerald-50/50 px-4 hover:bg-emerald-50/80 cursor-pointer",
                              !date && "text-emerald-500"
                            )}
                          >
                            <Calendar className={cn("h-4 w-4 shrink-0", lang === 'ar' ? 'ml-3' : 'mr-3')} />
                            {date ? format(date, "PPP") : <span>{t.booking.pickDate}</span>}
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2 rounded-3xl border-none shadow-2xl" align="start">
                            <CalendarUI
                              mode="single"
                              selected={date as any}
                              onSelect={setDate as any}
                              className="rounded-2xl pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <Button type="submit" className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold tracking-widest uppercase text-xs cursor-pointer transition-all shadow-lg shadow-emerald-600/30">
                        {t.booking.submit}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="about" className="bg-white text-emerald-600 py-24 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="font-heading text-2xl text-emerald-800 mb-6 flex items-center gap-3 font-semibold">
              <div className="w-8 h-8 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              </div>
              Aura Dental
            </div>
            <p className="max-w-sm mb-8 leading-relaxed font-light">
              {t.footer.desc}
            </p>
          </div>
          <div>
            <h4 className="text-emerald-800 font-medium mb-6 uppercase tracking-widest text-xs">{t.footer.contact}</h4>
            <div className="space-y-4 text-sm font-light">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span dir="ltr" className={lang === 'ar' ? 'text-right' : ''}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.footer.address}<br/>{t.footer.city}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-emerald-800 font-medium mb-6 uppercase tracking-widest text-xs">{t.footer.hours}</h4>
            <div className="space-y-4 text-sm font-light">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.footer.weekdays}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.footer.weekend}<br/>{t.footer.closed}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
