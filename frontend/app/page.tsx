import Twin from "@/components/twin";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Top Nav */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div>
            <span className="font-semibold text-lg tracking-tight">
              Digital Twin
            </span>
            <span className="ml-2 text-xs text-neutral-500">
              AI Operations Console
            </span>
          </div>

          <div className="text-sm text-neutral-500">
            Secure · Real-time · Session-based
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Conversation Interface
            </h1>
            <p className="mt-2 text-neutral-600 max-w-2xl">
              Communicate with your deployed AI digital twin in real time.
              Conversations are ephemeral unless persistence is enabled.
            </p>
          </div>

          <div className="rounded-2xl border bg-white shadow-md h-[720px] overflow-hidden">
            <Twin />
          </div>
        </div>
      </section>

    </main>
  );
}
