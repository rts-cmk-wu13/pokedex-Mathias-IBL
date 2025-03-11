let sectionElm = document.createElement("section")
sectionElm.class = "pokelist"

sectionElm.innerHTML = `
    <article>
        <h2>Charmander</h2>
    </article>

    <article>
        <h2>Pikachu</h2>
    </article>

`

document.querySelector("main").append(sectionElm)