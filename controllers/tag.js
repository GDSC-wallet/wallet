import Tag from "../db_interact/tag.js";

export const get_tag = async (req, res, next) => {
    await Tag.get_tag(req.query.tag_id)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
};

export const insert_tag = async (req, res, next) => {
    await Tag.insert_tag(req.body.tag_wallet_id, req.body.tag_ordinary, req.body.tag_name, req.body.tag_type, req.body.tag_color)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
};

export const update_tag = async (req, res, next) => {
    await Tag.update_tag(req.body.tag_id, req.body.tag_ordinary, req.body.tag_name, req.body.tag_type, req.body.tag_color)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
};

export const delete_tag = async (req, res, next) => {
    await Tag.delete_tag(req.body.tag_id)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
};


export const update_all_tag = async (req, res, next) => {

    await Tag.update_all_tag(req.body.tags)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
};
