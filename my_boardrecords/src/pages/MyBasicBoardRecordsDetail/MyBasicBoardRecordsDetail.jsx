import React from 'react';
import styles from '../../styles/MyBasicBoardRecordsDetail/mybasicboardrecordsdetail.module.css';

const MyBasicBoardRecordsDetail = () => {
    return (
        <div className={styles.mybasicboardrecordsdetail_container}>

            {/* 좌우 섹션 */}
            <div className={styles.left_right_section}>
                {/* 좌측 : 처방전 이미지 영역 */}
                <div className={styles.image_section}>
                    <img
                        src="/images/mybasicboardrecords/records_1.jpg"
                        alt="진료 기록 이미지입니다"
                        className={styles.image}
                    />
                </div>

                {/* 우측 : 정보 텍스트 영역 */}
                <div className={styles.form_section}>
                    <div className={styles.form_group}>
                        <label>처방 일자</label>
                        <input type="date" />
                    </div>

                    <div className={styles.form_group}>
                        <label>약국명</label>
                        <input type="text" placeholder="OO약국" />
                    </div>
                    <div className={styles.form_group}>
                        <label>약사명</label>
                        <input type="text" placeholder="박약사" />
                    </div>
                    <div className={styles.form_group}>
                        <label>처방내역</label>
                    </div>
                    {/* 처방 테이블 영역 */}
                    <div className={styles.form_table_container}>
                        <table className={styles.rx_table}>
                            <thead>
                                <tr>
                                    <th>약 이름</th>
                                    <th>복용 방법</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>카페실텐플러스</td>
                                    <td>하루 1번</td>
                                </tr>
                                <tr>
                                    <td>카페실텐플러스</td>
                                    <td>하루 1번</td>
                                </tr>
                                <tr>
                                    <td>카페실텐플러스</td>
                                    <td>하루 1번</td>
                                </tr>
                                <tr>
                                    <td>카페실텐플러스</td>
                                    <td>하루 1번</td>
                                </tr>
                                <tr>
                                    <td>카페실텐플러스</td>
                                    <td>하루 1번</td>
                                </tr>
                                <tr>
                                    <td>카페실텐플러스</td>
                                    <td>하루 1번</td>
                                </tr>
                                <tr>
                                    <td>카페실텐플러스</td>
                                    <td>하루 1번</td>
                                </tr>
                                <tr>
                                    <td>카페실텐플러스</td>
                                    <td>하루 1번</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    {/* 기타 내용 section */}
                    <div className={styles.form_group}>
                        <label>기타 내용</label>
                        <textarea placeholder="정상 사유 방법에 대해 기재 부탁드립니다." />
                    </div>
                </div>
            </div>

            {/* 버튼 섹션 */}
            <div className={styles.button_section}>
                <div className={styles.button_section_01}>
                    <button className={styles.button}>목록</button>
                </div>
                <div className={styles.button_section_02}>
                    <button className={styles.button}>수정</button>
                    <button className={styles.button}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default MyBasicBoardRecordsDetail;
