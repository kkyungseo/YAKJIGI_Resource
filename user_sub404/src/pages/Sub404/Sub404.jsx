import React from 'react';
import styles from '../../styles/Sub404/sub404.module.css';

function Sub404(props) {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <div className={styles.sub404_container}>
                <h2 className={styles.main_title}>운영진에게 문의</h2>
                <p className={styles.sub_title}>
                    문의내용을 남겨주시면 순차적으로 확인하여 답변해드리겠습니다
                </p>
            </div>

            <div className={styles.table_container}>
                <ul className={styles.contents_box}>
                    <li className={styles.textcenter}>
                        <div>
                            <ul className={styles.inquiry_number}>
                                <li>총 <span>16</span>건</li>
                            </ul>
                        </div>
                        <div className={styles.table}>
                            <table className={styles.inquiry_table}>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>제목</th>
                                        <th>처리상태</th>
                                        <th>등록일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>10</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_waiting}>
                                                답변대기
                                            </div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_waiting}>
                                                답변대기
                                            </div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr><tr>
                                        <td>8</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_waiting}>
                                                답변대기
                                            </div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr><tr>
                                        <td>7</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_waiting}>
                                                답변대기
                                            </div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr><tr>
                                        <td>6</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_waiting}>
                                                답변대기
                                            </div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr><tr>
                                        <td>5</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_completed}>답변완료</div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr><tr>
                                        <td>4</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_completed}>답변완료</div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr><tr>
                                        <td>3</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_completed}>답변완료</div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr><tr>
                                        <td>2</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_completed}>답변완료</div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td><p>제목입니다</p></td>
                                        <td>
                                            <div className={styles.status_completed}>답변완료</div>
                                        </td>
                                        <td>2024.00.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* paging 영역 start */}
                        <div>
                            <ul className={styles.paging_num_ul}>
                                <li className="material-icons prev">keyboard_double_arrow_left</li>
                                <li className="material-icons prev">chevron_left</li>
                                <li className={styles.active}>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li className="material-icons next">chevron_right</li>
                                <li className="material-icons next">keyboard_double_arrow_right</li>
                            </ul>
                        </div>
                        {/* paging 영역 end */}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sub404;