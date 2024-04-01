using AsoftTest.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Validation;

namespace AsoftTest.Controllers
{
    public class UserController : Controller
    {
        private testEntities db = new testEntities();
        // GET: User
        public ActionResult Index()
        {
            var listUser = new testEntities().Tests.ToList();
            return View(listUser);
        }

       
        [HttpGet]
        public ActionResult GetUserByID(string userID)
        {
            var user = db.Tests.FirstOrDefault(u => u.UserID == userID);

            if (user != null)
            {
                // Trả về dữ liệu người dùng dưới dạng JSON
                return Json(user, JsonRequestBehavior.AllowGet);
            }
            else
            {
                // Nếu không tìm thấy người dùng, trả về null
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

       
        public ActionResult GetData()
        {
            var data = db.Tests.Select(test => new
            {
                UserID = test.UserID,
                UserName = test.UserName
            }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetDataSource()
        {
            var data = db.Tests.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult XoaUser(string userID)
        {
            if (string.IsNullOrEmpty(userID))
            {
                return Json(new { success = false, message = "UserID is required." });
            }

            try
            {
                var user = db.Tests.FirstOrDefault(u => u.UserID.ToString() == userID);
                if (user == null)
                {
                    return Json(new { success = false, message = "User not found." });
                }

                db.Tests.Remove(user);
                db.SaveChanges();

                return Json(new { success = true, message = "User deleted successfully." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = $"An error occurred: {ex.Message}" });
            }
        }


        [HttpPost]
        public ActionResult SuaUser( string userName, string password, string tel, string userID)
        {

            try
            {
                // Tìm user dựa trên userID
                var user = db.Tests.FirstOrDefault(u => u.UserID == userID);
                user.UserName = userName;
                user.Password = password;
                user.Tel = tel;
                db.SaveChanges();

                return Json(new { success = true, message = "User updated successfully.", user = user });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = $"An error occurred: {ex.Message}" });
            }
        }
        public ActionResult ThemUser(string userName, string password, string tel, string userID)
        {
            if (string.IsNullOrEmpty(userID))
            {
                return Json(new { success = false, message = "UserID is required." });
            }

            // Kiểm tra userID đã tồn tại trong cơ sở dữ liệu chưa
            var existingUser = db.Tests.FirstOrDefault(u => u.UserID == userID);
            if (existingUser != null)
            {
                return Json(new { success = false, message = "UserID already exists." });
            }
            try
            {
                var user = new Test();
                user.UserID = userID;
                user.UserName = userName;
                user.Password = password;
                user.Tel = tel;
                db.Tests.Add(user);
                db.SaveChanges();

                return Json(new { success = true, message = "User create successfully.", user = user });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = $"An error occurred: {ex.Message}" });
            }
        }
    }

}