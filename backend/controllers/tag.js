import Tag from "../db_interact/tag.js";

export const get_tag = async (req, res, next) => {
    await Tag.get_tag(req.query.tag_id)
        .then(result => {
            result.tag_name = result.tag_name.slice(1, result.tag_name.length-1);
            var response = {
                "success": true,
                "message": "取得tag資料成功",
                "data": result
            }
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得tag資料失敗",
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
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
    const expense_rule = /tag_expense/;
    const income_rule = /tag_income/;
    if(expense_rule.test(req.body.tag_id) || income_rule.test(req.body.tag_id)) {
        var err = new Error(`The tag is not allowed to delete`);
        next(err);
    }
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
