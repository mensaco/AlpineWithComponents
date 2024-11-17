window.App = () => {
    window.AppData = {

        testlabel: 'test label',
        testtext: 'test text',
        showHide: false,

       
        _componentDefinitions: {},
        /// read component definitions into the memory
        async getComponents() {
            const r = await fetch(`/Components/Components.html`)
            const htmlText = await r.text()
            const frag = document.createElement('div')
            frag.innerHTML = htmlText;
            [...frag.children].forEach(child => {
                console.log(child.localName)
                this._componentDefinitions[child.localName] = child.innerHTML
            });
            delete frag
            delete htmlText
            delete r
        },
        async init() {

            await this.getComponents()            

            Object.keys(this._componentDefinitions).forEach(tag => {
                const components = [...document.querySelectorAll(tag)];
                components.forEach(async component => {
                    if (this._componentDefinitions[tag] == undefined) {
                        alert(`A ${tag} definition was not found`)
                    }
                    else {
                        let replacement = this._componentDefinitions[tag];

                        [...component.attributes].forEach(a => {
                            replacement = replacement.replace(a.name, a.value)
                        })

                        const creator = document.createElement("div")
                        creator.innerHTML = replacement.trim()
                        component.parentNode.replaceChild(creator.firstElementChild, component)
                        delete creator
                    }


                });

            });
        }

    }
    return window.AppData;
}