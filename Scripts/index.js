window.App = () => {
    window.AppData = {

        testlabel: 'test label',
        testtext: 'test text',
        showHide: false,

        componentsNames: [
            'labelled-text'
        ],
        _componentDefinitions: {},
        init() {
            this.componentsNames.forEach(tag => {
                const components = [...document.querySelectorAll(tag)];
                components.forEach(async component => {
                    if (this._componentDefinitions[tag] == undefined) {
                        const r = await fetch(`/Components/${tag}.html`)
                        const htmlText = await r.text()

                        this._componentDefinitions[tag] = htmlText
                        delete htmlText
                        delete r
                    }

                    let replacement = this._componentDefinitions[tag];

                    [...component.attributes].forEach(a => {
                        replacement = replacement.replace(a.name, a.value)
                    })

                    const creator = document.createElement("div")
                    creator.innerHTML = replacement
                    component.parentNode.replaceChild(creator.firstElementChild, component)
                    delete creator
                });

            });
        }

    }
    return window.AppData;
}