const router = require ('express').Router();

router.get('/loancalculatorInput', (req, res) => {
    const loanAmount = Number(req.query.Amount);
    const months = Number(req.query.months);

    const interest = loanAmount * 0.01 * months;
    const totalAmount = interest + loanAmount;
    const monthlyAmortization = totalAmount / months;

    res.json({
        loanAmount,
        months,
        interest: Number(interest.toFixed(2)),
        totalAmount: Number(totalAmount.toFixed(2)),
        monthlyAmortization: Number(monthlyAmortization.toFixed(2))
    });
});

module.exports = router;