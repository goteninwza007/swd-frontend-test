'use client'

import { useTranslation } from 'react-i18next'
import styles from "./page.module.scss"
import { Col, Row } from 'antd'
import Link from 'next/link'

export default function Page() {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <Row gutter={24} justify="center">
        <Col span={12}>
          <Link href="/test1">
            <div className={styles.card}>
              <p className={styles['text-primary']}>{t('main-page-option.test-1-title')}</p>
              <div className={styles.divider} />
              <p className={styles['text-secondary']}>{t('main-page-option.test-1-description')}</p>
            </div>
          </Link>
        </Col>
        <Col span={12}>
          <Link href="/test2">
            <div className={styles.card}>
              <p className={styles['text-primary']}>{t('main-page-option.test-2-title')}</p>
              <div className={styles.divider} />
              <p className={styles['text-secondary']}>{t('main-page-option.test-2-description')}</p>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  )
}
