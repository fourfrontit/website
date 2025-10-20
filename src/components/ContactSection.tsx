import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, ExternalLink } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          Contact
        </span>
      </h2>
      <p className="mt-2 text-slate-300">
        Send us your project idea. We’ll reply with a short questionnaire and a scoped SOW.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Message us</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <form className="space-y-3">
              <Input placeholder="Your name" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
              <Input placeholder="Company / MSP" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
              <Input type="email" placeholder="Email" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
              <Textarea placeholder="Tell us about your project…" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[140px]" />
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 w-full">Send</Button>
              <p className="text-xs text-slate-400">
                By submitting, you agree to our response via email. We don’t spam or sell data.
              </p>
            </form>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Direct</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-2">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> projects@fourfrontit.example <ExternalLink className="h-4 w-4 opacity-60" />
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> +1 (672) 762-3822
            </p>
            <div className="pt-4 text-sm opacity-80">
              Prefer to skip email? Share your completed questionnaire and request a calendar link.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
