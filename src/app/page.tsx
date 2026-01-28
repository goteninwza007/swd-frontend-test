'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t, i18n } = useTranslation()

  return (
    <>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <button onClick={() => i18n.changeLanguage('th')}>TH</button>
      <h1>{t('home.title')}</h1>

      <Link href="/task1">{t('home.task1')}</Link>
      <br />
      <Link href="/task2">{t('home.task2')}</Link>
    </>
  )
}
