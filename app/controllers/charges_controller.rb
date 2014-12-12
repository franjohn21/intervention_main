class ChargesController < ApplicationController

	def new
		puts "*"*50
		puts ENV['SECRET_KEY']
	end

	def create
	  # Amount in cents
	  @amount = 2500
	  customer = Stripe::Customer.create(
	    :email => params[:stripeEmail],	
	    :card  => params[:stripeToken]
	  )

	  charge = Stripe::Charge.create(
	    :customer    => customer.id,
	    :amount      => @amount,
	    :description => 'Rails Stripe customer',
	    :currency    => 'usd',
	    :shipping 	 => {
	    	:address => { :line1 => params[:stripeShippingAddressLine1], :city => params[:stripeShippingAddressCity], :country => params[:stripeShippingAddressCountry], :line2 => params[:stripeShippingAddressApt], :postal_code => params[:stripeShippingAddressZip], :state => params[:stripeShippingAddressState]},
	    	:name => params[:stripeShippingName]
	    },
	    :metadata => {:line1 => params[:stripeShippingAddressLine1], :city => params[:stripeShippingAddressCity], :country => params[:stripeShippingAddressCountry], :line2 => params[:stripeShippingAddressApt], :postal_code => params[:stripeShippingAddressZip], :state => params[:stripeShippingAddressState]}
	  )

	  p charge
	rescue Stripe::CardError => e
	  flash[:error] = e.message
	  redirect_to charges_path
	end


end
