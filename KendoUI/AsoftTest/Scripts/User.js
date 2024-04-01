
function checkPasswordMatch() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var errorDiv = document.getElementById("passwordMatchError");

    if (password !== confirmPassword) {
        errorDiv.innerHTML = "Mật khẩu không trùng khớp.";
    } else {
        errorDiv.innerHTML = "";
    }
}
$(document).ready(function () {
    $('#saveButton').click(function () {

        // Kiểm tra mã người dùng
        var userId = $('#userId').val().trim();
        if (userId === '') {
            alert('Vui lòng nhập mã nhân viên.');
            return false;
        }
        var userName = $('#userName').val().trim();
        if (userName === '') {
            alert('Vui lòng nhập tên nhân viên.');
            return false;
        }
        var password = $('#password').val().trim();
        var confirmPassword = $('#confirmPassword').val().trim();
        if (password !== '' || confirmPassword !== '') {
            if (password !== confirmPassword) {
                alert('Mật khẩu nhập lại không khớp.');
                return false;
            }
        }
        var email = $('#email').val().trim();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            alert('Email không hợp lệ.');
            return false;
        }

    });



    $('.editUser').click(function () {
        var userID = $(this).data('userid');
        console.log(userID);
        $('#myModalUd').find('.modal-title').text('Sửa thông tin người dùng');
        $('#myModalUd').find('button[type="submit"]').show();
        $('#myModalUd').find('input').not('#editUserID').prop('readonly', false);
        $.ajax({
            url: '/User/GetUserByID',
            type: 'GET',
            data: { userID: userID },
            success: function (response) {
                // Điền dữ liệu vào form sửa
                $('#editUserID').val(response.UserID);
                $('#editUserName').val(response.UserName);
                $('#editEmail').val(response.Email);
                $('#editPassword').val(response.Password);
                $('#editTel').val(response.Tel);
            },
            error: function () {
                alert('Có lỗi xảy ra khi lấy dữ liệu người dùng.');
            }
        });
    });


    $('.deleteUser').click(function () {
        var button = $(this);
        if (confirm("Bạn có muốn xóa không?")) {
            var userID = $(this).data('userid');
            $.ajax({
                url: '/User/XoaUser',
                type: 'POST', 
                data: { userID: userID },
                success: function (response) {
                    alert('Xóa thành công');
                    button.closest('tr').remove();
                },
                error: function () {
                    alert('Đã xảy ra lỗi khi xóa người dùng');
                }
            });
        }
    });
    $('.detailUser').click(function () {
        // Thay đổi tiêu đề form
        $('#myModalUd').find('.modal-title').text('Xem thông tin người dùng');
        // Ẩn nút Lưu
        $('#myModalUd').find('button[type="submit"]').hide();
        // Thêm thuộc tính readonly cho các ô input
        $('#myModalUd').find('input').prop('readonly', true);
        var userID = $(this).data('userid');
        console.log(userID);
        $.ajax({
            url: '/User/GetUserByID',
            type: 'GET',
            data: { userID: userID },
            success: function (response) {
                $('#editUserID').val(response.UserID);
                $('#editUserName').val(response.UserName);
                $('#editEmail').val(response.Email);
                $('#editPassword').val(response.Password);
                $('#editTel').val(response.Tel);
            },
            error: function () {
                alert('Có lỗi xảy ra khi lấy dữ liệu người dùng.');
            }
        });
    });


});