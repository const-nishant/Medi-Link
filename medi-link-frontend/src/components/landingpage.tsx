"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  CalendarClock,
  FolderOpen,
  HeartPulse,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* Hero */}
      <section className="bg-white dark:bg-black py-24 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              MediLink: Your Gateway to Smarter Healthcare Management
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Book appointments, manage patient profiles, and digitize medical
              records — all in one platform, built for doctors and patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  className="w-full sm:w-auto border-gray-300 dark:border-zinc-700"
                  variant="outline"
                  size="lg"
                >
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/medic.jpg"
              alt="Medical"
              fill
              className="object-cover rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="bg-gray-100 dark:bg-zinc-900 py-20 px-4 md:px-20 mt-12"
        id="features"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">Why Choose MediLink?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature
              icon={CalendarClock}
              title="Easy Appointments"
              description="Book, reschedule, and manage appointments in real time."
            />
            <Feature
              icon={HeartPulse}
              title="Patient Profiles"
              description="Access medical history, prescriptions, and reports instantly."
            />
            <Feature
              icon={FolderOpen}
              title="Digital Reports"
              description="Upload, store, and view medical files securely."
            />
            <Feature
              icon={Stethoscope}
              title="Doctor Dashboard"
              description="Real-time overview of patients, schedules, and updates."
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-white dark:bg-black py-20 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Image or Illustration */}
          <div className="w-full h-64 sm:h-80 relative rounded-xl overflow-hidden shadow-md">
            <Image
              src="/dashboard-preview.jpg" // Replace with your actual image path
              alt="MediLink Dashboard"
              fill
              className="object-cover"
            />
          </div>
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold mb-6">What is MediLink?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              MediLink is a full-stack medical appointment and health record
              platform designed for seamless communication between doctors and
              patients. Whether you are scheduling visits or reviewing digital
              health files, MediLink keeps everything centralized, secure, and
              accessible.
            </p>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li>✅ Book and manage appointments instantly</li>
              <li>✅ Digitally store prescriptions and reports</li>
              <li>✅ Access your health data anytime, anywhere</li>
              <li>✅ HIPAA-compliant and privacy-first design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 dark:bg-zinc-900 py-20 px-4 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-300 dark:divide-zinc-700">
            {[
              {
                question: "Is MediLink free to use?",
                answer:
                  "Yes! MediLink offers a free version for patients. Doctors and clinics can opt for premium plans to unlock advanced features such as analytics, custom branding, and priority support.",
              },
              {
                question: "How secure is my medical data?",
                answer:
                  "MediLink uses end-to-end encryption and complies with global healthcare data standards like HIPAA and GDPR to ensure your information remains confidential and secure.",
              },
              {
                question: "Can I use MediLink on mobile devices?",
                answer:
                  "Absolutely. MediLink is fully responsive and works smoothly across desktops, tablets, and smartphones. A dedicated mobile app is also in development.",
              },
              {
                question: "Do I need to install any software?",
                answer:
                  "No installation is needed. MediLink is a fully cloud-based platform that runs in your browser. Just sign in and start managing your appointments and records.",
              },
              {
                question: "How do I reset my password?",
                answer:
                  "Click on 'Forgot Password' on the login screen. You'll receive an email with instructions to securely reset your password.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                open={idx === 0}
              >
                <summary className="flex items-center justify-between cursor-pointer text-left text-gray-900 dark:text-white">
                  <h3 className="text-lg font-medium">{item.question}</h3>
                  <svg
                    className="size-5 transition-transform duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="pt-4 text-sm text-gray-700 dark:text-zinc-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-zinc-950 py-10 text-center text-sm text-muted-foreground">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2">© 2025 MediLink. All rights reserved.</p>
          <p className="text-xs text-gray-500 dark:text-zinc-500">
            Built for modern healthcare professionals and their patients.
          </p>
        </div>
      </footer>
    </main>
  );
}

// ✅ Reusable Feature Component
function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-zinc-800 rounded-xl shadow hover:shadow-md transition-all">
      <Icon className="w-10 h-10 mb-4 text-primary" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
