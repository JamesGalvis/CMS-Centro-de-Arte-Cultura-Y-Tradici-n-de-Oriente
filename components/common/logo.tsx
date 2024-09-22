import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/icons/uniminuto-logo.png"
        alt="Logo uniminuto"
        width={255}
        height={68}
        className="w-[170px] h-[45px] hidden dark:block object-cover"
      />
      <Image
        src="/icons/logo-uniminuto.png"
        alt="Logo uniminuto"
        width={255}
        height={68}
        className="w-[170px] h-[45px] block dark:hidden object-cover"
      />
    </Link>
  )
}
