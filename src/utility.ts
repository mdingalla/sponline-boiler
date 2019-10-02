import Swal from 'sweetalert2'



const MySwal = Swal



class MyUtility {
    
    static MyConfirmationAlert(title="Confirm Delete",titleText="File will be deleted.",confirmButtonText="Yes, delete it!"){
        return MySwal.fire({
            title:title,
            titleText:titleText,
            type:'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
        })
    }

    static UrlSearchParamProxy: any = function(name) {
        var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
          window.location.href
        );
        if (results == null) {
          return null;
        } else {
          return decodeURI(results[1]) || 0;
        }
      };
}

export default MyUtility;