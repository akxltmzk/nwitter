import { getFirebaseDB } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function Home() {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const q = query(collection(getFirebaseDB, "nweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };

  useEffect(() => {
    console.log("3")
    getNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(getFirebaseDB, "nweets"), {
        nweet,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={nweet}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet,id)=>(
          <div key={id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
