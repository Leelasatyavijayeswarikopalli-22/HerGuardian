import {
  Shield,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-8 md:grid-cols-3">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-2">

              <Shield className="text-pink-600" />

              <h2 className="text-xl font-bold">
                HerGuardian
              </h2>

            </div>

            <p className="mt-3 text-sm text-slate-600">
              AI-powered women safety platform
              providing safer mobility,
              community-driven reporting,
              and emergency assistance.
            </p>

          </div>
          {/* Features */}
<div>

  <h3 className="mb-3 font-semibold">
    Key Features
  </h3>

  <ul className="space-y-2 text-sm text-slate-600">

    <li>
      ✓ Dynamic Women Safety Score
    </li>

    <li>
      ✓ AI Mobility Safety Report
    </li>

    <li>
      ✓ Secret Voice SOS
    </li>

    <li>
      ✓ Community Safety Network
    </li>

    <li>
      ✓ Real-Time Risk Prediction
    </li>

  </ul>

</div>
          {/* Quick Links */}
          <div>

            <h3 className="mb-3 font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-slate-600">

              <li>
                <a href="/dashboard">
                  Dashboard
                </a>
              </li>

              <li>
                <a href="/safety-map">
                  Safety Map
                </a>
              </li>

              <li>
                <a href="/reports">
                  Community Reports
                </a>
              </li>

              <li>
                <a href="/mobility">
                  Mobility Report
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-3 font-semibold">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-slate-600">

              <div className="flex items-center gap-2">
                <Mail size={16} />
                support@herguardian.ai
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                Emergency Support
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                India
              </div>

            </div>

          </div>

        </div>

        <div className="mt-8 border-t pt-5 text-center text-sm text-slate-500">

          © 2026 HerGuardian. Empowering safer journeys through AI.

        </div>

      </div>

    </footer>
  );
}
