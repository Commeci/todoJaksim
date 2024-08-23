let db;

class Post {
    static async injectDB(conn) {
        try {
            db = conn.db("todo");
            console.log("DB연결 성공");
        } catch (e) {
            console.error(e);
        }
    }

    static async getAll() {
        return await db
            .collection("posts")
            .find()
            .sort({ _id: -1 })
            // .limit(3) // 필요시 주석 해제
            .toArray();
    }
    static async create(postData) {
        return await db.collection("posts").insertOne(postData);
    }
    static async delete(postId) {
        return await db.collection("posts").deleteOne({ _id: postId });
    }
    static async getOne(postId) {
        return await db.collection("posts").findOne({ _id: postId });
    }
    static async update(postId, postData) {
        return await db
            .collection("posts")
            .updateOne({ _id: postId }, { $set: postData });
    }
}

export default Post;
