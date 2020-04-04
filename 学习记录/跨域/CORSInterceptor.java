package cn.com.longrui.mwms.interceptor;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

import cn.com.longrui.mwms.utils.common.ResourceUtils;
import cn.com.taobo.utils.common.CheckUtils;

/** 
 * <p>Filename:    AuthorizationInterceptor.java <p> 
 * <p>Title: 用户权限拦截器 <p>
 * <p>Description: ajax请求，不可使用该拦截器<p>
 * 
*/
public class CORSInterceptor extends AbstractInterceptor {
	
	private static final long serialVersionUID = 1L;

	private static final String SYSTEM_CONFIG_RES = "runtimecfg.system-config";
	
	private Set<String> acceptDomainSet = null;
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		
		invocation.getInvocationContext();
		HttpServletResponse response = (HttpServletResponse) ActionContext.getContext().get(ServletActionContext.HTTP_RESPONSE);
		 invocation	.getInvocationContext();
		HttpServletRequest req = (HttpServletRequest) ActionContext.getContext().get(
							ServletActionContext.HTTP_REQUEST);
		 String originHeader=req .getHeader("Origin"); 
		 if(CheckUtils.isEmpty(acceptDomainSet)) {
			 initAcceptuCorsDomain();
		 }
		 //if (acceptDomainSet.contains(originHeader)) {
		 if(true) {
			 response.setHeader("Access-Control-Allow-Origin", originHeader);
			 response.setHeader("Access-Control-Allow-Credentials", "true");
			 response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");  
		     response.setHeader("Access-Control-Max-Age", "1800");//30 min
		     		
			 response.setHeader("Access-Control-Allow-Headers", "content-type");
			
			 response.setStatus(200);
			 response.setContentType("text/plain");
			 response.setCharacterEncoding("utf-8");
		 }
		return invocation.invoke();
		
	}
	
	private void initAcceptuCorsDomain(){
		//从资源文件获取是否从数据库获取权限信息
		ResourceUtils resUtils = ResourceUtils.getResource(CORSInterceptor.SYSTEM_CONFIG_RES);
		String acceptDomain = resUtils.getValue("system.cors.accept.domain",null);
		if(!CheckUtils.isEmpty(acceptDomain)) {
			String[] domain = acceptDomain.split(",");
			acceptDomainSet= new HashSet<String>(Arrays.asList(domain)); 
		}
	}
}