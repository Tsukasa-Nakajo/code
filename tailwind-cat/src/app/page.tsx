"use client"; //これを入れることでクライアントサイドのレンダリングであることを伝える

import { NextPage } from "next";
import { useEffect,useState } from "react";
import styles from "./index.module.css";


// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl); // 初期値を渡す
  const [loading, setLoading] = useState(false); // 初期状態はfalseにしておく

  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
     });
    }, []);
  
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
        <div className="flex justify-center items-center min-h-screen flex-col gap-5">
          <button onClick={handleClick} className="h-14 w-55 border-none p-1.5-0-0-10  text-red-400 bg-white">
            One more cat!
          </button>
          <div className={styles.frame}>
            {loading || <img src={imageUrl} className={styles.img}/>}
          </div>
        </div>
  );
};
export default IndexPage;

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};