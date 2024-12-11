import React from 'react';
import styles from '../../styles/Sub103/sub103.module.css';

function Sub103() {
    return (
        <div className={styles.Sub103}>
            <section className={styles.sub103_container}>
                <section className={styles.text_section}>
                    <h1 className={styles.main_title}>의약품의 허가과정</h1>
                    <h3 className={styles.sub_title}>우리가 사용하는 의약품이 만들어지는 과정</h3>
                    <p className={styles.contents_description}>
                        의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다.
                        의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다.
                        의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다.
                        의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다.
                        의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다.
                        의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다.
                        의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다.
                        의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다. 의약품에 관한 텍스트 내용입니다.
                    </p>
                </section>

                <section className={styles.image_section}>
                    <div className={styles.image_container}>
                        <img src="/images/sub103/103_1.jpg" alt="신약개발과정요약_대표이미지" />
                    </div>
                    <div className={styles.scroll_message}>
                        좌우로 스크롤하세요
                    </div>
                </section>
            </section>
        </div>
    );
}

export default Sub103;
