

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { handleNewUserWithReferral } from '../../firebaseFunctions';
import './ref.css';

interface ReferProps {
  userId: string;
  balanceRef: React.MutableRefObject<{ value: number }>;
  onRewardClaimed: () => void;
}

const Refer: React.FC<ReferProps> = ({ userId, balanceRef, onRewardClaimed }) => {
  const [inviteCount, setInviteCount] = useState<number>(0);
  const [referrerId, setReferrerId] = useState<string | null>(null);
  const [headingText, setHeading] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formVisible, setFormVisible] = useState<boolean>(true);

  const inviteLink = `https://t.me/databasetest01_bot    (Reffer Code:${userId})`;
  const sharelink = `https://t.me/share/url?url=https://t.me/databasetest01_bot (Reffer Code:${userId})`;

  const handleInviteClick = () => {
    window.Telegram.WebApp.openLink(sharelink);
  };

  const handleReferrerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferrerId(e.target.value);
    setErrorMessage(""); // Clear the error message when the input changes
  };

  const handleReferralSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    if (referrerId) {
      if (referrerId === userId) {
        setErrorMessage("* Cannot use Own Referrer Id.");
        return;
      }

      const db = getDatabase();
      const referrerRef = ref(db, `users/${referrerId}`);

      try {
        const snapshot = await get(referrerRef);
        if (!snapshot.exists()) {
          setErrorMessage("* Enter Valid referrer ID.");
          return;
        }

        await handleNewUserWithReferral(userId, referrerId);
        setHeading(referrerId); // Set the heading text to the referrer ID
        localStorage.setItem(`headingText-${userId}`, referrerId); // Save heading text to localStorage
        balanceRef.current.value += 1000; // Add 1000 points to the balance
        onRewardClaimed(); // Notify the parent component that the reward was claimed
        setErrorMessage(""); // Clear the error message on successful submission
        setFormVisible(false); // Hide the form after successful submission
        localStorage.setItem(`formVisible-${userId}`, 'false'); // Save form visibility state to localStorage
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(`Failed to handle new user with referral: ${error.message}`);
        } else {
          setErrorMessage(`Failed to handle new user with referral: ${String(error)}`);
        }
      }
    } else {
      setErrorMessage("Please enter a referrer ID.");
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/inviteCount`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const count = snapshot.val();
      console.log(`Fetched invite count for user ${userId}: ${count}`);
      setInviteCount(count);
    }, (error) => {
      console.error("Failed to fetch invite count:", error);
      setErrorMessage(`Failed to fetch invite count: ${error.message}`);
    });

    // Check form visibility state from localStorage
    const savedFormVisible = localStorage.getItem(`formVisible-${userId}`);
    if (savedFormVisible === 'false') {
      setFormVisible(false);
    }

    // Check heading text from localStorage
    const savedHeadingText = localStorage.getItem(`headingText-${userId}`);
    if (savedHeadingText) {
      setHeading(savedHeadingText);
    }

    // Cleanup listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [userId]);

  return (
    <div>
      <h4 className='headingText'>Referrer Id: {headingText}</h4>
      <h2 className='reftitle'>{inviteCount} Referral</h2>
      <button className='referbutton' onClick={handleInviteClick}>Invite Friends +</button>
      <p className='reflink'>Invite-Code:{userId}</p>
      <p className='refinvite'>{inviteLink}</p>
      {formVisible && (
        <form onSubmit={handleReferralSubmission}>
          <h4 className='reftitle'>Enter Referrer ID and Earn 1000</h4>
          <input 
            type="text" 
            value={referrerId || ''} 
            onChange={handleReferrerIdChange} 
            className='refinput' 
            placeholder="Enter referrer ID"
            required 
          />
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <button type='submit' className='refersubmitbutton'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default Refer;
