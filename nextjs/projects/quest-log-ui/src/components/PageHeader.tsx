import styles from '@/styles/PageHeader.module.css';
import styleUtils from '@/styles/Utils.module.css';
import Link from 'next/link';
import { AiFillHome, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

export const PageHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styleUtils.horizontalStack}>
        <Link href="/home" className={styles.homeButton}>
          <AiFillHome />
        </Link>
        <h1 className={styles.title}>Ignacio Grassini</h1>
      </div>
      <div className={styleUtils.horizontalStack}>
        <Link href="https://github.com/Igrass97" className={styles.contactIcon}>
          <AiFillGithub />
        </Link>
        <Link
          href="https://www.linkedin.com/in/ignacio-agust%C3%ADn-grassini-75113b150/"
          className={styles.contactIcon}
        >
          <AiFillLinkedin />
        </Link>
      </div>
    </header>
  );
};
