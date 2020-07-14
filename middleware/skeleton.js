export default function({ store, route }) {
    let skeleton = null;

    if (route.name.indexOf("page-one") !== -1)
        skeleton = "skeleton-page-one";
    else if (route.name.indexOf("page-two") !== -1)
        skeleton = "skeleton-page-two";

    store.commit("UPDATE_SKELETON", skeleton);
}
