import React, { useState,useEffect } from "react";
import InputControl from "../InputControl";
import { fetchGeminiData } from "../../useGeminiApi";
import {
  generatePrompt,
  extractMessage,
  generatePositiveWords,
} from "../../getPrompt";
import useGeminiApi from "../custom-hooks/useGemini";
// import generatePrompt from "../custom-hooks/useGemini";
import "./loader.css";
import "./home.css";
function Home() {
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [tone, setTone] = useState("Short and Simple");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState(""); // State to store the generated message
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [thirdLine, setThirdLine] = useState("");
  // useGeminiApi()
async function fetch(){
  try {
    setLoading(true); // Set loading state to true while fetching data
    const prompt=generatePrompt(name, hobbies, tone, language);
    alert(prompt)
    const res = await fetchGeminiData(prompt);
    const { part1, part2 } = extractMessage(res);
    const part3 =generatePositiveWords(name) //array value is returned
    setFirstLine(part1);
    setSecondLine(part2);
    setThirdLine(part3);
    setName1(name1)
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
}
  const handleSelectChange = (event) => {
    setTone(event.target.value); 
    alert(tone)
    if (name) {   //important==>not working because setTone is async which executes later but alert aur fetch() phle hi call ho ja raha tha uska baad state change ho raha tha 
      fetch();
    }
     // Update the selected option when it changes
  };
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!name) {
      setError("this field is required");
      return; // Exit the function if name is empty
    }
    // Clear any previous errors
    setError(null);
    console.log("called submit");
    let name1=name;
    fetch();
  };
  return (
    <>
      <div
        className="min-w-[300px] max-w-[600px] 
        flex flex-col items-center
        pt-7 mx-auto p-2 bg-teal-100
        "
      >
        <p className="font-bold text-center text-xl">
          Enter Name below and get Started
        </p>
        <form onSubmit={handleSubmit} className="w-[100%] p-5">
          <InputControl
            label={"Enter Name :"}
            type={"text"}
            onchange={(value) => setName(value)}
            // id={"title"}
            value={name}
            placeholder={"Enter Name Here"}
            error={error}
          />
          <InputControl
            label={"Hobbies :(optional)"}
            type={"text"}
            value={hobbies}
            onchange={(val) => setHobbies(val)}
            placeholder={"caring,biking,music,dance,reels"}
            
          />
          <label className="text-xl text-green-800  h-[60px] mb-[30px]p-1 my-3 mb-[50px] font-bold text-left">
            Keep the Tone :
          </label>
          <select
            value={tone}
            onChange={handleSelectChange} // Call handleSelectChange when the selection changes
            className="w-full h-[45px] mt-2 mb-2 rounded-md bg-slate-100 border-2 border-black-300 px-3 placeholder:pl-3 text-green-800 outline-green-600"
          >
            <option value="Short and Simple">Short and Simple</option>
            <option value="Funny">Funny</option>
            <option value="Happy">Happy</option>
            <option value="Rhyming Poem">Rhyming Poem</option>
            <option value="Heartfelt">Heartfelt</option>
            <option value="Inspirational">Inspirational</option>
            <option value="Professional">Professional</option>
            <option value="Poetic">Poetic</option>
          </select>
          <label className="text-xl h-[60px] mb-[30px] mt-2 text-green-800  font-bold text-left">
            language :
          </label>
          <select
            value={language}
            onChange={handleLanguageChange} // Call handleSelectChange when the selection changes
            className="w-full h-[45px] mt-2 bg-slate-100 border-2 border-black-300 rounded-md px-3 placeholder:pl-3 text-green-800 outline-green-600"
          >
            <option value="English">English</option>
            <option value="Hinglish">Hinglish</option>
            <option value="Hindi">Hindi</option>
          </select>

          <button
            type="submit"
            className="bg-green-300 mt-4 p-2 w-[150px] text-center rounded-lg font-bold text-green-800"
          >
           {loading?'loading data...':'Generate'}
          </button>
        </form>
        {loading && (
          <div className="flex flex-col justify-center items-center ">
            <h1 className="mt-6"> loading data... </h1>
            <div className="loader  m-4"></div>
          </div>
        )}
      
      <div className="w-full bg-cyan-100">
      
        <div className="flex flex-col ">
          {firstLine && (
            
              <div className="flex flex-col px-4 mx-2 py-1 items-center justify-center">
                <h2  className="text-2xl text-center dotted-text p-1 leading-10  text-black-500">
                  Happy Birthday <span className="font-bold text-orange-500">{name1}</span>
                  <br></br>
                  🧁🕯🎈🥳🎁🎉
                </h2>
                <p className="p-1 pl-2 my-6 italic text-xl border-l-4 bg-orange-50 border-orange-500">{firstLine}</p>
                <hr className="font-bold text-red-400"></hr>
              </div>
          
          )}
          {secondLine && (
            
              <div className="flex flex-col px-4 mx-2 ">
                <p className="text-2xl font-bold text-orange-500">
                  Greetings for <span className="font-bold">{name1 || "you"}</span>
                </p>
                <p className="pb-8 pt-2 text-xl">{secondLine}</p>
              </div>
           
          )}
          {thirdLine && (
          
              <div className="font-bold mb-4 px-4 mx-2">
                <h3 className="pb-4 text-2xl text-orange-500">Specially for {name1 || "you"}</h3>
                {thirdLine.map(word => {
                  const firstChar=word.charAt(0);
                  const restChar=word.slice(1,word.length)
                  return <p className="text-centre px-4 text-xl"><span className="text-2xl text-orange-400 font-bold	">{firstChar}</span><span>{restChar}</span></p>;
                }
                )}
              </div>
            
          )}
     
        
      
      </div>
      </div>
      </div>
    </>
    
  
  );
}

export default Home;
