import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

export default function QuoteStack() {
    const [quoteList, setQuoteList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch quotes from the database
    const fetchQuotes = async () => {
        setErrorMessage(""); // Reset error message before fetching
        const { data, error } = await supabase.from("QuoteList").select("*");
        if (error) {
            console.error("Error fetching quotes:", error);
            setErrorMessage("Failed to fetch quotes. Please try again.");
        } else {
            setQuoteList(data); // Update state with fetched quotes
        }
    };

    // Use useEffect to fetch quotes on component mount
    useEffect(() => {
        fetchQuotes();
    }); // Empty dependency array ensures it runs only once on mount

    return (
        <div id="quotestack">
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {quoteList.length > 0 ? (
                quoteList.map((quote) => (
                    <div key={quote.id} className="quote">
                        <p>{quote.Quote}</p>
                    </div>
                ))
            ) : (
                <p>No quotes available.</p>
            )}
        </div>
    );
}
