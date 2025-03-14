let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header>
        <span class="brand">Pokédex</span>
        <form action="detail.html">
            <input type="search" name="name" id="name">
        </form>
    </header>
    <main></main>
    <footer>Created 2025</footer>
`

document.querySelector("body").append(divElm)