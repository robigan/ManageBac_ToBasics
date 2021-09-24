<template>
    <div class="container position-absolute top-0 start-50 translate-middle-x mt-3">
        <h1 class="text-center">Choose a ManageBac Subdomain</h1>
        <h2 class="text-center" v-if="doRedirect && redirect">Redirecting in 5 seconds... <button class="btn btn-danger" v-on:click="stopRedirect()">Stop</button></h2>
        <ul>
            <li v-for="(name, subdomain) in cache" v-bind:key="name" class="mb-2">
                <a v-bind:href="calcSubdomain(subdomain)" class="link-primary m-1 fs-4">Go to {{name}}</a>
                <button type="reset" v-on:click="removeSubdomain(subdomain)" class="btn btn-danger m-1">Delete</button>
                <button type="button" class="btn btn-success m-1" v-on:click="updateRedirect(subdomain)" v-if="redirect !== subdomain">Make Default</button>
            </li>
            <li class="d-grid gap-1 border border-2 p-1 rounded border-primary">
                <input type="text" placeholder="Friendly name" v-model="name" class="border border-2 rounded-2 border-success">
                <input type="text" placeholder="Enter the subdomain (Not the full url)" v-model="subdomain" class="border border-2 rounded-2 border-danger">
                <button v-on:click="addToSubdomains" class="btn btn-warning">Add!</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            name: null,
            subdomain: null,
            cache: this.getSubdomains(),
            redirect: this.getRedirect(),
            doRedirect: true
        };
    },
    mounted() {
        if (!window.localStorage.getItem("subdomains")) {
            console.warn("Creating subdomains...");
            this.updateSubdomains({});
            console.log(window.localStorage.getItem("subdomains"));
        }
        setTimeout(async () => {
            if (this.doRedirect && this.redirect) window.location = this.calcSubdomain(this.redirect);
        }, 5000);
    },
    methods: {
        async addToSubdomains() {
            const subdomains = this.getSubdomains();
            this.updateSubdomains(Object.assign(subdomains, {[this.subdomain]: this.name}));
        },
        getSubdomains() {
            return JSON.parse(window.localStorage.getItem("subdomains"));
        },
        updateSubdomains(value) {
            window.localStorage.setItem("subdomains", JSON.stringify(value));
            this.cache = this.getSubdomains();
        },
        getRedirect() {
            return window.localStorage.getItem("redirect");
        },
        updateRedirect(redirect) {
            window.localStorage.setItem("redirect", redirect);
            this.redirect = this.getRedirect();
        },
        calcSubdomain(sub) {
            return `https://${sub}.managebac.com`;
        },
        async removeSubdomain(key) {
            /** @type {Object} */
            const subdomains = this.getSubdomains();
            delete subdomains[key];
            this.updateSubdomains(subdomains);
        },
        async stopRedirect() {
            this.doRedirect = false;
        },
        async openWindow(subdomain) {
            window.open(`https://${subdomain}.managebac.com`, "foreground-tab", "frame=false,nodeIntegration=no")
        }
    }
};
</script>