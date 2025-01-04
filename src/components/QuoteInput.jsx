import {useState} from 'react';
import supabase from "../supabaseClient";
import QuoteStack from "./QuoteStack"

export default function QuoteInput(){
    const [quote,setQuote]= useState("");
    const handleQuoteChange = (e) => {
        setQuote(e.target.value);
    }
    async function saveQuote(){
        const uid = Date.now();
        const { data, error } = await supabase
  .from('QuoteList')
  .insert({ id:uid , Quote: quote });
  if (error) {
    console.error('Error saving quote:', error);
  } else {
    console.log('Quote saved successfully:', data);
    setQuote("");
    console.log(quote);
  }

    }
    return (
        <>
        <input type="text" placeholder="Enter Quote" value={quote}onChange={handleQuoteChange}/>
        <button onClick={saveQuote} disabled={!quote.trim()}>Submit</button>
        </>
    );
}