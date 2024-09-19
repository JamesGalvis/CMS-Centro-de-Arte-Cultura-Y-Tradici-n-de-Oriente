import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full flex overflow-hidden">
      <div className="shrink-0 md:w-1/2 flex-1 overflow-y-auto overflow-x-hidden min-h-full">
        {children}
      </div>
      <div className="shrink-0 w-1/2 hidden mx:flex flex-col justify-between py-8 px-12 bg-zinc-700/30 dark:bg-accent">
        <Image
          src="/icons/um-logo.png"
          alt="Uniminuto Logo"
          width={200}
          height={50}
          className="w-[60px] h-auto"
        />

        <div>
          <span className="text-lg">Sistema de gestión de contenidos</span>
          <h1 className="lg:text-3xl text-2xl font-extrabold max-w-[500px] w-full">
            Centro de Arte, Cultura Y Treadición de Oriente (CACTO)
          </h1>
        </div>
      </div>
    </div>
  )
}
