// @ts-nocheck
import supabase from "$lib/db.js";
import { get } from "svelte/store";
import { products, theme, categories, priorityToCategory, wordList } from "$lib/stores";
import { session } from "$lib/stores";

// white, orange, babyblue, babygreen
const colors = ["#EEE", "#F6C90E", "#B7D3F2", "#a1c181"];

// stringify Categories for Supabase
// import { stringifyCategories } from "./categories";
// stringifyCategories();

let updatedCategories;
let priorities;
let updatedProducts;

export const getProducts = async () => {
    let {data: dbProducts} = await supabase.from('products').select("*").order("sort", {ascending: true});
    products.set([...dbProducts]);
    updatedProducts = dbProducts;
}

export const getUserData = async () => {
    let {data: userdata} = await supabase.from('userdata').select('categories, priorityToCategory'); // get userdata
    userdata = userdata[0];
    // set categories
    categories.set(userdata.categories);
    updatedCategories = userdata.categories;
    // set category order
    priorities = userdata.priorityToCategory;
    priorityToCategory.set(Object.values(priorities));
}

export const getTheme = async () => {
    let {data: dbTheme} = await supabase.from('userdata').select('theme');
    theme.set(colors[dbTheme[0].theme]);
}

export const setTheme = async () => {
    let index = colors.findIndex(color => get(theme) === color);
    if (index === colors.length - 1 || index === -1) {
        theme.set(colors[0]);
        await supabase.from('userdata').update({"theme": 0}).eq("user_id", get(session).user.id);
    } else {
        theme.set(colors[index + 1]);
        await supabase.from('userdata').update({"theme": index + 1}).eq("user_id", get(session).user.id);
    }
}

export const addProduct = async (input) => {
    if (input !== "") {
        for (let i = 0; i < updatedProducts.length; i++) {
            let updatedProduct = updatedProducts[i];
            if (input === updatedProduct.title) {
                if (updatedProduct.checked === false) {
                    let result = confirm(`"${updatedProduct.title}" ${get(wordList).index.productAlreadyListed}`);
                    if (result) {
                        let product = updatedProduct;
                        updateAmount(product.amount + 1, product.id);
                    }
                    return;
                } else {
                    updateAmount(1, updatedProduct.id);
                    updateType("stk", updatedProduct.id);
                    toggleChecked(updatedProduct.id, updatedProduct.created, updatedProduct.checked);
                    return;
                }
            }
        }
        let category = getCategory(input);
        let sort = await getSort(category);
        await supabase.from('products').insert([{title: input, category: category, sort: sort, user_id: supabase.auth.user().id}]);
        getProducts();
    }
}

export const updateTitle = async (id, title, oldTitle, oldCategory) => {
    if (title === oldTitle) return;
    let newCategory = getCategory(title);
    changeCategory(title, oldCategory, newCategory, id);
    if (title !== "" ) {
        await supabase.from('products').update({"title": title}).eq("id", id);
    }
    getProducts();
}

export const toggleChecked = async (id, created, checked) => {
    let now = created;
    if (checked == true) {
        now = new Date();
    }
    await supabase.from('products').update({"checked": !checked, "created_at": now}).eq("id", id);
    getProducts();
}

export const deleteProduct = async (id, confirmMessage) => {
    if (confirm(confirmMessage)) {
    await supabase.from('products').delete().eq("id", id);
        getProducts();
    }    
}

export const deleteAll = async (confirmMessage) => {
    if (confirm(confirmMessage)) {
        for (let i = 0; i < updatedProducts.length; i++) {
            await supabase.from('products').delete().eq("id", updatedProducts[i].id);
        }
        getProducts();
    }
}

export const updateAmount = async (amount, id) => {
    if (amount === "") {
        await supabase.from('products').update({"amount": 1}).eq("id", id);
    } else {
        await supabase.from('products').update({"amount": amount}).eq("id", id);
    }
    getProducts();
}

export const updateType = async (type, id) => {
    await supabase.from('products').update({"type": type}).eq("id", id);
    getProducts();
}

// categories
export const getCategory = (input) => {
    input = input.toLowerCase();
    input = input.trim();
    
    // first, check if there's an explicit fit
    for (let i = 0; i < priorities.length; i++) {
        if (updatedCategories[priorities[i]].includes(input)) {
            let category = priorities[i];
            return category;
        }
    }
    if (input.length <= 3) {
        return "choose";
    }

    // then check if there's an other not perfect fitting entry
    for (let i = 0; i < priorities.length; i++) {
        for (let y = 0; y < updatedCategories[priorities[i]].length; y++) {
            let product = updatedCategories[priorities[i]];
            if (product[y].includes(input) || input.includes(product[y])) {
                let category = priorities[i];
                return category;
            }
        }
    }
    return "choose";
}

export const changeCategory = async (input, oldCategory, category, id) => {
    await supabase.from('products').update({"category": category}).eq("id", id);
    await supabase.from('products').update({"sort": await getSort(category)}).eq("id", id);

    if (oldCategory !== "choose") {
        updatedCategories[oldCategory] = updatedCategories[oldCategory].filter(value => value != input.toLowerCase());
    }
    updatedCategories[category] = [input.toLowerCase(), ...updatedCategories[category]];
    await supabase.from('userdata').update({"categories": updatedCategories}).eq("user_id", get(session).user.id);
    getProducts();
    getUserData();
}

export const createUserData = async () => {
    await supabase.from('userdata').insert([
        {user_id: get(session).user.id}
    ]);
}

export const changePriorities = async (changedPriorities) => {
    priorityToCategory.set(changedPriorities);
    await supabase.from('userdata').update({"priorityToCategory": changedPriorities}).eq("user_id", get(session).user.id);
    priorities = changedPriorities;

    updatedProducts.forEach(async updatedProduct => {
        let id = updatedProduct.id;
        let sort = await getSort(updatedProduct.category);
        await supabase.from('products').update({"sort": sort}).eq("id", id);
        location.reload();
    });
}

const getSort = async (category) => {
    if (category === "choose") return 0;
    for (let i = 0; i <= Object.keys(priorities).length; i++) {
        if (priorities[i] === category) return i + 1;
    }
}

// auth
export const logout = async () => {
    let {error} = await supabase.auth.signOut();
    if (error) console.log(error);
}