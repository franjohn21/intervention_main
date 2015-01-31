class ChargesController < ApplicationController

	def new

	end

	def create
		begin
		  # Amount in cents
		  @amount = params[:args][:shipping_address_country_code] == "US" ? params[:quantity].to_i*2500 : params[:quantity].to_i*4000
		  customer = Stripe::Customer.create(
		    :email => params[:token][:email],
		    :card  => params[:token][:id]
		  )
		  @email = params[:token][:email]
		  @dollar_amount = "$#{@amount/100}.00"
		  @num_copies = "#{params[:quantity]} #{params[:quantity] == '1' ? 'copy' : 'copies'}"
		  charge = Stripe::Charge.create(
		    :customer    => customer.id,
		    :amount      => @amount,
		    :description => 'Intervention Pre-order',
		    :currency    => 'usd',
		    :shipping 	 => {
		    	:address => {
		    		:line1 => params[:args][:shipping_address_line1], 
		    		:city => params[:args][:shipping_address_city], 
		    		:country => params[:args][:shipping_address_country], 
		    		:line2 => params[:args][:shipping_address_apt], 
		    		:postal_code => params[:args][:shipping_address_zip], 
		    		:state => params[:args][:shipping_address_state]},
		    	:name => params[:args][:shipping_name]
		    },
		    :metadata => {
		    	:shipping_addr_line1 => params[:args][:shipping_address_line1], 
		    	:shipping_addr_city => params[:args][:shipping_address_city], 
		    	:shipping_addr_country => params[:args][:shipping_address_country], 
		    	:shipping_addr_line2 => params[:args][:shipping_address_apt], 
		    	:shipping_addr_postal_code => params[:args][:shipping_address_zip], 
		    	:shipping_addr_state => params[:args][:shipping_address_state]}
		  )
		rescue => e
		  flash[:error] = e.message
		  render :new
		end
	end

end
