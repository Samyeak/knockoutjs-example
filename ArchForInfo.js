function ViewModel() {
    const Posts = ko.observableArray([]);
    const NewPost = ko.observable(new Post);
    const Buttons = ko.observableArray([]);
    const Dropdowns = ko.observableArray([]);

    const vm = {
        //Data Objects
        NewPost: NewPost,
        Posts: Posts,
        //UI Elements
        Buttons: Buttons,
        Dropdowns: Dropdowns,
        //Events
        Events: {
            AddPost: function (post) {
                console.log("Adding Post");
                let newPost = ko.toJS(post);
                Posts.push(newPost);
                addPost(newPost);
                NewPost(new Post);
            },
            DeletePost: function (post) {
                console.log("Deleting Post");
                Posts.remove(post);
            }
        }
    };

    function Init() {
        getPosts();
    };

    Init();
    return vm;

    // Models
    function Post(item) {
        item = item || {};
        this.userId = ko.observable(item.id || 0);
        this.userId = ko.observable(item.userId || 1);
        this.title = ko.observable(item.title || "");
        this.body = ko.observable(item.body || "");
    };

    //Fetch Api
    function getPosts() {
        const url = "https://jsonplaceholder.typicode.com/posts/";
        apiService.get(url, { userId: 1 })
            .then(data => {
                vm.Posts(data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    function addPost(post) {
        const url = "https://jsonplaceholder.typicode.com/posts/";
        apiService.post(url, post)
            .then(data => {
                console.log("Post create success");
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };
}