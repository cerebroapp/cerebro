/* eslint max-len: 0 */
import React from 'react'
import styles from './styles.css'

export default () => (
  <div className={styles.wrapper}>
    <p>
      The answer is indeterminate. Why? Because anything can be an anwer, see:
    </p>

    <div className={styles.block}>
      <p>Lets suppose that anwer is <span className={styles.math}><sup>x</sup>&frasl;<sub>y</sub></span></p>
      <p>If <span className={styles.math}><sup>0</sup>&frasl;<sub>0</sub> = <sup>x</sup>&frasl;<sub>y</sub></span> then <span className={styles.math}>x&middot;0 = y&middot;0</span></p>
      <p>And it is correct, because <span className={styles.math}>0 = 0</span>.</p>
      <p>So any <span className={styles.math}>x</span> and <span className={styles.math}>y</span> could be an anwer.</p>
    </div>
  </div>
)
