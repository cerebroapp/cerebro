import React, { Component }  from 'react';
import Loading from 'main/components/Loading';
import styles from './styles.css';

export default () => (
  <div className={styles.wrapper}>
    <p>
      The answer is indeterminate. Why? Because anything can be an anwer, see:
    </p>

    <div className={styles.block}>
      <p>Maybe it is <span className={styles.math}><sup>2</sup>&frasl;<sub>3</sub></span>?</p>
      <p>If <span className={styles.math}><sup>0</sup>&frasl;<sub>0</sub> = <sup>2</sup>&frasl;<sub>3</sub></span> then <span className={styles.math}>2&middot;0 = 3&middot;0</span></p>
      <p>And it is correct, because <span className={styles.math}>0 = 0</span>.</p>
    </div>
    <div className={styles.block}>
      <p>Maybe it is <span className={styles.math}><sup>5</sup>&frasl;<sub>4</sub></span>? Hmm.. Yes, exactly.</p>
    </div>
  </div>
);
