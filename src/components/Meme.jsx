import React from "react";
// import memesData from "../memesData.jsx";

function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });
    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(obj => setAllMemes(obj.data.memes))
    }, [])

    function generateRandomMeme() {
        let memes = allMemes;
        let rand = Math.floor(Math.random() * memes.length);
        let url = memes[rand].url;
        setMeme((prevMeme) => ({ ...prevMeme, randomImage: url }));
    }

    function handleChange(event) {
        const {name, value} = event.target

        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <div className="meme">
            <div className="meme--form">
                <div>
                    <label className="meme--label">Top text</label>
                    <input
                        type="text"
                        className="meme--top--input form--input"
                        placeholder="Shut up"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="meme--label">Bottom Text</label>
                    <input
                        type="text"
                        className="meme--bottom--input form--input"
                        placeholder="And take my money"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>

                <button onClick={generateRandomMeme} className="meme--submit">
                    Get a new meme image 🖼️
                </button>
            </div>

            <div className="meme--position">
                <img
                    src={meme.randomImage}
                    className="meme--image"
                    alt="Meme Image"
                />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    );
}

export default Meme;
