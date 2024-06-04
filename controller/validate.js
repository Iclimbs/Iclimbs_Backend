const router = require("express").Router();
const dns = require("dns");

router.post("/email", async (req, res) => {
	try {
		const domain = req.body.email.split("@")[1];
		console.log({
			domain,
			action: "Checking if domain is valid",
		});
		const mx = await dns.promises.resolveMx(domain);
		if (!!mx) {
			return res.json({
				status: "success",
				message: "Valid email1"
			})
		}
		return res.status(403).json({
			status: "error",
			message: "Invalid email",
			mx,
		});
	} catch (error) {
		return res.status(403).json({
			status: "error",
			message: "Invalid email",
		});
	}
});


router.post("/tel", async (req, res) => {
	try {
		return res.json({
			status: "success",
			message: "Valid",
		});
	} catch (error) {
		console.log(error);
		return res.json({
			status: "error",
			message: "Invalid Phone number",
		});
	}
});


module.exports = router;
