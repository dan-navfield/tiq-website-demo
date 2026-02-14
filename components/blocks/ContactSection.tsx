import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="tiq-section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {blok.heading && (
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                {blok.heading}
              </h2>
            )}

            {blok.description && (
              <p className="text-gray-600 text-base leading-relaxed">
                {blok.description}
              </p>
            )}

            <div className="space-y-4">
              {blok.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-navy flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {blok.address}
                  </p>
                </div>
              )}

              {blok.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-navy flex-shrink-0" />
                  <a href={`tel:${blok.phone}`} className="text-sm text-navy font-medium hover:underline">
                    {blok.phone}
                  </a>
                </div>
              )}

              {blok.email && (
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-navy flex-shrink-0" />
                  <a href={`mailto:${blok.email}`} className="text-sm text-navy font-medium hover:underline">
                    {blok.email}
                  </a>
                </div>
              )}
            </div>

            {blok.cta_text && blok.cta_url && (
              <Link href={blok.cta_url} className="tiq-btn inline-block">
                {blok.cta_text}
              </Link>
            )}
          </div>

          {/* Map or Image */}
          {blok.map_embed && (
            <div
              className="aspect-square md:aspect-auto md:min-h-[400px] bg-gray-100 rounded overflow-hidden"
              dangerouslySetInnerHTML={{ __html: blok.map_embed }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
