import React from 'react';
import styles from '../../styles/Sub102/sub102.module.css';

function Sub102() {
    return (
        <div className={styles.Sub102}>
            <section className={styles.sub102_container}>
                <section className={styles.text_section}>
                    <h1 className={styles.main_title}>의약품의 종류</h1>
                    <h3 className={styles.sub_title}>우리의 삶 속 의약품</h3>
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
                        <img src="/images/sub102/102_1.jpg" alt="일반의약품_대표이미지" />
                        <div className={styles.overlay_title}>일반의약품</div>
                        <div className={styles.overlay_hover}>
                            일반의약품에 대한 설명입니다.일반의약품에 대한 설명입니다.일반의약품에 대한 설명입니다.
                            일반의약품에 대한 설명입니다.일반의약품에 대한 설명입니다.일반의약품에 대한 설명입니다.
                        </div>
                    </div>
                    <div className={styles.image_container}>
                        <img src="/images/sub102/102_2.jpg" alt="전문의약품_대표이미지" />
                        <div className={styles.overlay_title}>전문의약품</div>
                        <div className={styles.overlay_hover}>
                            전문의약품에 대한 설명입니다. 전문의약품에 대한 설명입니다. 전문의약품에 대한 설명입니다.
                            전문의약품에 대한 설명입니다. 전문의약품에 대한 설명입니다. 전문의약품에 대한 설명입니다.
                        </div>
                    </div>
                    <div className={styles.image_container}>
                        <img src="/images/sub102/102_3.jpg" alt="건강기능식품_대표이미지" />
                        <div className={styles.overlay_title}>건강기능식품</div>
                        <div className={styles.overlay_hover}>
                            건강기능식품에 대한 설명입니다. 건강기능식품에 대한 설명입니다. 건강기능식품에 대한 설명입니다.
                            건강기능식품에 대한 설명입니다. 건강기능식품에 대한 설명입니다. 건강기능식품에 대한 설명입니다.
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}

export default Sub102;
