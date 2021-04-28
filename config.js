const CONFIG = {
    MONGO       : 'mongodb+srv://dbuser:abcd@mastercluster.usel1.mongodb.net/social-awarness-app?retryWrites=true&w=majority',
    PORT        :  process.env.PORT || 3000,
    apis        : {
        apiForProfile :
            {
                register    : `/register`,
                signin      : `/signin`,
                details     : `/details`,
                count       : `/getUserCount`
            },
        apiForPost    :
            {
                create      : `/create`,
                update      : `/update`,
                delete      : `/delete/:id`,
                getAll      : `/getAll`,
                getAllPending: `/getAllPending`,
                upvote      : `/upvote/:id`,
                approve     : `/approve/:id`,
                count       : `/getPostCount`
            },
        apiForComment :
        {
                add         : `/add`,
                getAll      : `/getAll/:postId`
        }
        
    }
}

module.exports = CONFIG