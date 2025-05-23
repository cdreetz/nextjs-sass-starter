import styles from '@demos/DemoSearchComponentPerplexityAgentCalendar.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import Audio from '@system/svg/Audio';

const IconResult = (props) => {
  return (
    <svg fill="none" viewBox="-.5 -.5 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m5.390625 21.08333333c-.69878313 0-1.29271021-.24461458-1.78178125-.73384375-.48922917-.48908541-.73384375-1.0830125-.73384375-1.78178125v-3.234375h2.875v-13.41666666h14.375v16.65104167c0 .69876875-.24451875 1.29269583-.73360417 1.78178125-.48922916.48922916-1.08325208.73384374-1.78202083.73384374zm12.21659375-1.4375c.30489375 0 .5612-.10335625.76882292-.31002083s.31145833-.46273125.31145833-.76810417v-15.21354166h-11.5v11.97916667h9.34375v3.234375c0 .30537292.10311667.56143958.30930208.76810417.20618542.20666458.46177292.31002083.76666667.31002083zm-8.98221875-11.97916666v-1.4375h8.625v1.4375zm0 2.875v-1.4375h8.625v1.4375z"
        fill="currentColor"
      />
    </svg>
  );
};

const IconEmergency = (props) => {
  return (
    <svg fill="none" viewBox="-.5 -.5 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
      <path
        d="m5.03125 19.16666667v-1.4375h1.46145833l2.32395833-7.66666667h5.36666667l2.32395833 7.66666667h1.46145833v1.4375h-12.9375zm5.75-11.97916667v-4.3125h1.4375v4.3125zm5.63020833 2.34791667-1.03020833-1.03020833 3.06666667-3.04270833 1.00625 1.00625-3.04270833 3.06666667zm1.31770834 4.6v-1.4375h4.3125v1.4375zm-11.140625-4.6-3.04270834-3.06666667 1.00625-1.00625 3.06666667 3.04270833-1.03020833 1.03020833zm-5.63020834 4.6v-1.4375h4.3125v1.4375z"
        fill="currentColor"
      />
    </svg>
  );
};

const IconSearch = (props) => {
  return (
    <svg fill="none" {...props} viewBox="-.5 -.5 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m18.30421458 8.48125 3.1625 3.1625-1.03020833 1.03020833-3.18645833-3.18645833c-.36737708.27154375-.75071042.4671875-1.15.58697917s-.80610208.1796875-1.2204375.1796875c-1.15095833 0-2.13372917-.40527917-2.9483125-1.21588542s-1.221875-1.7948625-1.221875-2.95286458.40527917-2.14227271 1.21588542-2.95286458c.81060624-.81059188 1.79486249-1.21588542 2.95286458-1.21588542 1.15800208 0 2.14225833.40529354 2.95286458 1.21588542s1.21588542 1.7948625 1.21588542 2.95286458c0 .43125-.06789792.85449792-.20364583 1.26979167-.13574792.41529375-.31543542.790625-.5390625 1.12604167zm-3.424125.33541667c.76537292 0 1.411625-.26416458 1.93870833-.79254167.52708333-.52852083.790625-1.17539583.790625-1.940625 0-.76537292-.26416458-1.411625-.79254167-1.93870833-.52852083-.52708333-1.17539583-.790625-1.940625-.790625-.76537292 0-1.411625.26417896-1.93870833.79254167-.52708333.52852083-.790625 1.17539583-.790625 1.940625 0 .76537292.26416458 1.411625.79254167 1.93870833.52852083.52708333 1.17539583.790625 1.940625.790625zm-13.03525 12.26666666v-17.01041666h7.16354167c-.12779375.2875-.215625.575-.26354167.8625s-.071875.59095625-.071875.91041667c0 1.80487708.56699792 3.22239583 1.70104167 4.25260417 1.13404375 1.03020833 2.61946042 1.5453125 4.45625 1.5453125.26799792 0 .53604375-.01087708.80404167-.03258333.26799792-.02189792.54303958-.0589375.825125-.11116667l2.39583333 2.371875v7.21145832h-17.01041667z"
        fill="currentColor"
      />
    </svg>
  );
};

const IconFlashlight = (props) => {
  return (
    <svg fill="none" {...props} viewBox="-.5 -.5 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m5.75 4.69583333v-2.77916666h11.5v2.77916667h-11.5zm5.7456875 10.49375c.33829167 0 .62722917-.11835417.8668125-.3550625.23958333-.23685208.359375-.52435208.359375-.8625 0-.33829167-.11835417-.62722917-.3550625-.8668125-.23685208-.23958333-.52435208-.359375-.8625-.359375-.33829167 0-.62722917.11835417-.8668125.3550625-.23958333.23685208-.359375.52435208-.359375.8625 0 .33829167.11835417.62722917.3550625.8668125.23685208.23958333.52435208.359375.8625.359375zm-3.5894375 5.89375v-10.61354166l-2.15625-3.1625v-1.17395834h11.5v1.17395833l-2.15625 3.1625v10.61354167z"
        fill="currentColor"
      />
    </svg>
  );
};

const IconCamera = (props) => {
  return (
    <svg fill="none" {...props} viewBox="-.5 -.5 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m11.5 16.603125c1.15 0 2.11633542-.39133542 2.89895833-1.17395833.78262292-.78262292 1.17395833-1.74895833 1.17395833-2.89895833 0-1.16595625-.39133542-2.13626875-1.17395833-2.9109375-.78262292-.77466875-1.74895833-1.16197917-2.89895833-1.16197917-1.16595625 0-2.13626875.38731042-2.9109375 1.16197917s-1.16197917 1.74498125-1.16197917 2.9109375c0 1.15.38731042 2.11633542 1.16197917 2.89895833.77466875.78262292 1.74498125 1.17395833 2.9109375 1.17395833zm0-1.4375c-.76666667 0-1.39758542-.2515625-1.89270833-.7546875-.49512292-.503125-.74270833-1.13001875-.74270833-1.88072917 0-.76666667.24758542-1.39758542.74270833-1.89270833s1.12604167-.74270833 1.89270833-.74270833c.75071042 0 1.37760417.24758542 1.88072917.74270833.503125.49512292.7546875 1.12604167.7546875 1.89270833 0 .75071042-.2515625 1.37760417-.7546875 1.88072917s-1.13001875.7546875-1.88072917.7546875zm-9.58333333 4.959375v-15.165625h4.959375l1.74895833-2.084375h5.75l1.74895833 2.084375h4.959375v15.165625z"
        fill="currentColor"
      />
    </svg>
  );
};

const SwipeUp = (props) => {
  return (
    <svg fill="none" {...props} viewBox="-.5 -.5 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m5.41467917 12.81780417c-.75069604-.97428958-1.32170458-2.03645833-1.71302083-3.18645833-.39132104-1.15-.58697917-2.33991458-.58697917-3.56979167 0-.51112708.03194125-1.02220625.09583333-1.53333333.06388729-.51111271.15972063-1.02222542.2875-1.53333333l-1.77291667 1.74895833-.67083333-.67083333 3.01875-3.01875 3.01875 3.01875-.67083333.67083333-1.86875-1.84479167c-.12777938.51110792-.23958333 1.03020833-.33541667 1.55729167-.09583333.52708333-.14375 1.06216875-.14375 1.60520833 0 1.10208333.17169979 2.16822917.51510417 3.1984375.34341875 1.03020833.85052083 1.98456458 1.52135417 2.86302083zm9.05625 7.52291667-7.403125-3.42604167.43125-1.62916667 3.378125-.26354167-3.04270833-8.31354167 1.365625-.52708333 2.61145833 7.21145833 1.509375-.55104167-1.46145833-4.04895833 1.34166667-.47916667 1.46145833 4.04895833 1.48541667-.55104167-1.12604167-3.13854167 1.34166667-.503125 1.15 3.1625 1.509375-.55104167-.503125-1.34166667 1.365625-.52708333 2.99479167 8.3375-8.409375 3.090625z"
        fill="currentColor"
      />
    </svg>
  );
};

const Perplexity = (props) => {
  return (
    <svg {...props} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M101.008 42L190.99 124.905V124.886V42.1913H208.506V125.276L298.891 42V136.524H336V272.866H299.005V357.035L208.506 277.525V357.948H190.99V278.836L101.11 358V272.866H64V136.524H101.008V42ZM177.785 153.826H81.5159V255.564H101.088V223.472L177.785 153.826ZM118.625 231.149V319.392L190.99 255.655V165.421L118.625 231.149ZM209.01 254.812V165.336L281.396 231.068V272.866H281.489V318.491L209.01 254.812ZM299.005 255.564H318.484V153.826H222.932L299.005 222.751V255.564ZM281.375 136.524V81.7983L221.977 136.524H281.375ZM177.921 136.524H118.524V81.7983L177.921 136.524Z"
        fill="currentColor"
      />
    </svg>
  );
};

const IconWorking = (props) => {
  return (
    <svg fill="none" viewBox="-.5 -.5 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
      <path
        d="m15.02182708 17.96875c.27154375-.52708333.47916667-1.08210208.62291667-1.66510417.14375-.58300208.215625-1.1859375.215625-1.80885417 0-1.27779375-.27949792-2.44772708-.83854167-3.50989583s-1.31770833-1.94460208-2.27604167-2.64739583l-2.20416667 2.20416667v-7.66666667h7.66666667l-2.20416667 2.20416667c.83053958.75071042 1.49341875 1.64512292 1.98854167 2.68333333.49512292 1.03821042.74270833 2.16425208.74270833 3.378125 0 1.45345625-.33939375 2.77116458-1.01822917 3.953125s-1.57727292 2.14029375-2.6953125 2.875zm-10.23020833 2.15625 2.20416667-2.20416667c-.84654375-.75071042-1.51335208-1.64512292-2.00052083-2.68333333-.48714958-1.03821042-.73072917-2.16425208-.73072917-3.378125 0-1.45345625.33941292-2.77116458 1.01822917-3.953125.67883542-1.18196042 1.58522708-2.14029375 2.71927083-2.875-.27154375.52708333-.48314375 1.08210208-.63489583 1.66510417s-.22760417 1.1859375-.22760417 1.80885417c0 1.27779375.28352292 2.44772708.85052083 3.50989583.56699792 1.06216875 1.32168542 1.94460208 2.2640625 2.64739583l2.20416667-2.20416667v7.66666667z"
        fill="currentColor"
      />
    </svg>
  );
};

const IconCycle = (props) => {
  return (
    <svg fill="none" viewBox="-.5 -.5 24 24" {...props}>
      <path
        d="m8.4332375 20.60416667c-1.90071042-.63887292-3.46197917-1.78091875-4.68385417-3.42604167s-1.8328125-3.53783125-1.8328125-5.678125c0-.51112708.0359375-1.02220625.1078125-1.53333333s.19566292-1.01425208.37135417-1.509375l-1.53333333.88645833-.7187476-1.221875 4.14479406-2.39583333 2.39582854 4.12083333-1.24583333.71875-1.38957854-2.371875c-.22361271.52708333-.39531729 1.06614583-.51510896 1.6171875s-.17968751 1.1140625-.17968751 1.6890625c0 1.85279375.54705021 3.49393958 1.64114583 4.9234375 1.09408125 1.42949792 2.48768958 2.39981042 4.18072917 2.9109375zm6.9-12.45833333v-1.4375h2.75520833c-.76666667-1.05416667-1.72897708-1.87675208-2.88697917-2.46770833-1.15800208-.59097063-2.39185624-.88645834-3.70156249-.88645834-1.10208333 0-2.12831458.19965438-3.07864583.59895833-.95033125.39930396-1.79289792.95033125-2.52760417 1.653125l-.74270833-1.29375c.8625-.75069604 1.8328125-1.33767521 2.9109375-1.7609375s2.22414791-.63489583 3.43802083-.63489583c1.40553958 0 2.72727292.28350854 3.96510417.85052083s2.31197917 1.36961646 3.22239583 2.4078125v-1.82083333h1.4375v4.79166667zm-1.078125 14.85416667-4.14479167-2.39583333 2.39583333-4.12083333 1.221875.71875-1.38958333 2.41979167c2.07637292-.20762292 3.81335208-1.08612708 5.2109375-2.63541667 1.39758542-1.54928958 2.09635417-3.378125 2.09635417-5.48645833 0-.33541667-.01998125-.65885417-.05989583-.9703125s-.09981042-.62689375-.1796875-.94635417h1.48541667c.06387292.31946042.11178958.63887292.14375.95833333.03196042.31946042.04791667.63887292.04791667.95833333 0 2.28404375-.71477292 4.30449792-2.14427083 6.06145833-1.42949792 1.75696042-3.25435625 2.86699792-5.47447917 3.33020833l1.509375.88645833-.71875 1.221875z"
        fill="currentColor"
      />
    </svg>
  );
};

const Column = (props) => {
  let style = { ...props.style };
  if (props.isActive) {
    style = { background: `#565151` };
  }

  return (
    <div className={styles.column} style={style}>
      {props.day ? (
        <div className={styles.columnRow}>
          <span className={styles.square}>{props.day}</span>
        </div>
      ) : null}
      {props.children}
    </div>
  );
};

export default function DemoSearchComponentPerplexityAgent(props) {
  return (
    <div className={styles.root}>
      <div className={styles.top} style={{ paddingTop: 88 }}>
        10-25-2024
      </div>
      <div className={styles.top} style={{ paddingTop: 0 }}>
        11:11 PM
      </div>
      <div className={styles.top} style={{ paddingTop: 0 }}>
        Camogli, Italy
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>
          <div className={styles.row} style={{ opacity: 0.4 }}>
            <IconFlashlight height="24px" />
          </div>
          <div className={styles.row} style={{ opacity: 0.4 }}>
            <IconCamera height="24px" />
          </div>
          <div className={styles.rowActive}>
            <Perplexity height="24px" />
            <div className={styles.title}>Perplexity Agent is documenting your time in Italy</div>
          </div>

          <div className={styles.calendar}>
            <div className={styles.calendarRow}>
              <Column day="20">
                <div className={styles.columnRow}>
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                </div>
              </Column>
              <Column day="21">
                <div className={styles.columnRow}>
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                </div>
              </Column>
              <Column day="22">
                <div className={styles.columnRow}>
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                </div>
              </Column>
              <Column day="23">
                <div className={styles.columnRow}>
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                </div>
              </Column>
              <Column day="24">
                <div className={styles.columnRow}>
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                  <span className={styles.past} />
                </div>
              </Column>
              <Column day="25" isActive>
                <div className={styles.columnRow}>
                  <span className={styles.past} />
                </div>
              </Column>
              <Column day="26"></Column>
            </div>
          </div>

          <div className={styles.result}>
            <div className={styles.resultLeft}>
              <IconWorking height="16px" />
            </div>
            <div className={styles.resultRight}>
              <div style={{ opacity: 0.6 }}>21 Events</div>
              <div>Tracked 21 memorable events this week.</div>
            </div>
          </div>

          <div className={styles.result}>
            <div className={styles.resultLeft}>
              <IconWorking height="16px" />
            </div>
            <div className={styles.resultRight}>
              <div style={{ opacity: 0.6 }}>6 Pages</div>
              <div>Your agent created 6 pages based on your time in Italy.</div>
            </div>
          </div>

          <div className={styles.subResult}>
            <div className={styles.subResultLeft}>┌</div>
            <div className={styles.subResultRight}>
              <div style={{ opacity: 0.6 }}>Al Molo 16</div>
            </div>
          </div>

          <div className={styles.subResult}>
            <div className={styles.subResultLeft}>├</div>
            <div className={styles.subResultRight}>
              <div style={{ opacity: 0.6 }}>Hike to Abbey of San Fruttuoso</div>
            </div>
          </div>

          <div className={styles.subResult}>
            <div className={styles.subResultLeft}>├</div>
            <div className={styles.subResultRight}>
              <div style={{ opacity: 0.6 }}>Market Conversation at Castle della Dragonara</div>
            </div>
          </div>

          <div className={styles.subResult}>
            <div className={styles.subResultLeft}>├</div>
            <div className={styles.subResultRight}>
              <div style={{ opacity: 0.6 }}>Sublimis Boutique Hotel Debate</div>
            </div>
          </div>

          <div className={styles.subResult}>
            <div className={styles.subResultLeft}>├</div>
            <div className={styles.subResultRight}>
              <div style={{ opacity: 0.6 }}>Conversation at Soffio Di Mare</div>
            </div>
          </div>

          <div className={styles.subResult}>
            <div className={styles.subResultLeft}>└</div>
            <div className={styles.subResultRight}>
              <div style={{ opacity: 0.6 }}>Chenyu's Beethoven Violin Sonata No.1 Performance</div>
            </div>
          </div>

          <div className={styles.row} style={{ opacity: 0.4 }}>
            <IconSearch height="24px" />
          </div>
          <div className={styles.row} style={{ opacity: 0.4 }}>
            <Audio height="24px" />
          </div>
        </div>
      </div>
      <div className={styles.top} style={{ paddingTop: 0, paddingBottom: 88, opacity: 0.4 }}>
        <SwipeUp height="16px" style={{ marginRight: 8 }} />
        Swipe up to open
      </div>
    </div>
  );
}
