import { useState } from 'react';
import { Modal } from 'components/modal';
import * as styles from 'components/app/styles';

export const App = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <main css={styles.app}>
      <h1>Data Feed</h1>
      <button onClick={() => setShowModal(showModal => !showModal)}>
        New Tweet
      </button>
      {showModal && <Modal setShowModal={setShowModal} />}
    </main>
  );
};
