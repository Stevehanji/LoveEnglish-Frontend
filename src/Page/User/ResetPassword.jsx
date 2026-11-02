import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { userService } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassoword] = useState("");
    const [confirmPassword, setConfirmPassoword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await userService.resetPassword({
            newPassword, confirmPassword
        });

        if ("statusCode" in result) {
            alert(result.message);
            setIsLoading(false);
            return;
        }

        localStorage.removeItem("resetToken");
        setTimeout(() => navigate('/login'), 2000);
        setIsLoading(false);
    }

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">
                        ELSN
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        English Learning Social Network
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            {/* <Mail
                                size={28}
                                className="text-primary-600"
                            /> */}
                        </div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                            Change password
                        </h2>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Code Input */}
                        <div>
                            <Input
                                label="New password"
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassoword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <Input
                                label="Confirm password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassoword(e.target.value)

                                }
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={isLoading}
                            className="mt-6"
                        >
                            {isLoading
                                ? 'Verifying...'
                                : 'Change password'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}